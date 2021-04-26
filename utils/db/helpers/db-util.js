import { MongoClient } from "mongodb";
import { constants } from "../../constants";

const uri = process.env.dbConnectionString
  .replace("<dbHost>", process.env.dbHost)
  .replace("<dbName>", process.env.dbName)
  .replace("<dbUser>", encodeURIComponent(process.env.dbUser))
  .replace("<dbPass>", encodeURIComponent(process.env.dbPass));

const dbOperation = {
  updateOne: "UPDATE_ONE",
  updateMany: "UPDATE_MANY",
  deleteOne: "DELETE_ONE",
  deleteMany: "DELETE_MANY",
  createOne: "CREATE_ONE",
  createMany: "CREATE_MANY",
  readOne: "READ_ONE",
  readMany: "READ_MANY",
};

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = {
    conn: null,
    promise: null,
    user: null,
    collections: {},
    isRankingInProgress: false,
  };
}

const updateQuizRank = (quizId, reportsArray) => {
  const quizArray = [];
  reportsArray.map((userReport) => {
    // console.log("userReport", userReport);
    userReport.reports.map((quizReport) => {
      if (quizReport.id == quizId) quizArray.push(quizReport);
      else console.log("===========", quizReport.id, quizId);
    });
  });
  console.log("quiz array before ranking", quizArray);
  quizArray.sort(function (a, b) {
    return b.score.taken - a.score.taken;
  });
  const rankMap = {};
  let rank = 0;
  quizArray.map((doc, index) => {
    if (rankMap.hasOwnProperty(doc.score.taken)) {
      doc.rank = rankMap[doc.score.taken];
    } else {
      doc.rank = ++rank;
      rankMap[doc.score.taken + ""] = rank;
    }
  });
  console.log("quiz array after ranking", quizArray);
};

const markQuizAsRanked = async (id, tag) => {
  const tagParts = tag.split("-");
  tagParts[2] = "true";
  tag = tagParts.join("-");
  console.log("tag", tag);
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      quizTag: tag,
    },
  };
  const options = { upsert: false };
  const collectionDetails = constants.collectionMap.quiz;
  const queryResult = await updateDocument(
    collectionDetails.collectionName,
    collectionDetails.schema,
    filter,
    updateDoc,
    options
  );
  if (queryResult[0] === true) {
    console.log("Quiz `" + id + "` is marked as Ranked");
  }
};

const updateOverAllRank = async (reportsArray) => {
  // console.log("docsArray=>", reportsArray);
  reportsArray.sort(function (a, b) {
    return b.avgScore - a.avgScore;
  });
  const rankMap = {};
  let rank = 0;
  reportsArray.map((doc, index) => {
    if (rankMap.hasOwnProperty(doc.avgScore)) {
      doc.rank = rankMap[doc.avgScore];
    } else {
      doc.rank = ++rank;
      rankMap[doc.avgScore + ""] = rank;
    }
    console.log("Updated rank for the user " + doc._id);
  });
  // console.log("docsArraySorted=>", reportsArray);
};

const updateUserReports = async (reportsArray) => {
  try {
    reportsArray.map(async (report) => {
      const filter = { _id: report._id };
      const updateDoc = {
        $set: {
          ...report,
        },
      };
      const options = { upsert: false };
      const collectionDetails = constants.collectionMap.report;
      const queryResult = await updateDocument(
        collectionDetails.collectionName,
        collectionDetails.schema,
        filter,
        updateDoc,
        options
      );
      if (queryResult[0] === true) {
        console.log("User `" + report._id + "` is ranked");
      }
    });
  } catch (err) {
    console.error("Error in updateUserReports page");
  }
};

const handleRanking = async () => {
  try {
    if (cached.isRankingInProgress === false) {
      console.log("Ranking......");
      cached.isRankingInProgress = true;
      const collectionDetails = constants.collectionMap.quiz;
      const docCondition = {
        $expr: { $gt: [Date.now(), "$schedule.endTime"] },
      };
      const queryResponse = await getDocuments(
        collectionDetails.collectionName,
        collectionDetails.schema,
        docCondition
      );
      const quizCursor = queryResponse[0] ? queryResponse[1] : undefined;
      if (quizCursor) {
        const query = {};
        const allReportsQueryResponse = await getDocuments(
          constants.collectionMap.report.collectionName,
          constants.collectionMap.report.schema,
          query
        );
        const reportCursor = allReportsQueryResponse[0]
          ? allReportsQueryResponse[1]
          : undefined;
        if (reportCursor) {
          if ((await reportCursor.count()) === 0) {
            console.log(
              "No documents found in the collection => " +
                constants.collectionMap.report.collectionName
            );
          } else {
            const reportsArray = await reportCursor.toArray();
            const quizArray = await quizCursor.toArray();
            console.log("quizArray => ",quizArray);
            const promiseArr = []
            quizArray.map((doc) => {
              if (doc.quizTag.split("-")[2].toLowerCase() === "false") {
                console.log("Updatig ranks for quiz => " + doc._id);
                updateQuizRank(doc._id, reportsArray)
                promiseArr.push(markQuizAsRanked(doc._id, doc.quizTag))
              }              
            });
            if (promiseArr.length > 0) {
              await Promise.all(promiseArr)
              console.log("Quizzes ranked. Updating users overall rank");
              updateOverAllRank(reportsArray);
              await updateUserReports(reportsArray);
            }
          }
        } else {
          console.log(
            "Problem in Cursor fetched from DB in handle quiz completed method"
          );
        }
      } else {
        console.log("Problem in Cursor fetched from DB");
      }
      cached.isRankingInProgress = false;
    } else {
      console.log("quiz ranking is already in progress");
    }
  } catch (err) {
    console.error("Exception in handleRanking function ", err);
  }
};

export const getDatabaseInstance = async () => {
  if (cached.conn) {
    console.log("Mongo Client is already exists in the global scope.");
    return cached.conn;
  }

  console.log(
    "Mongo Client doesn't exists in the global scope. Making Database Connection..."
  );

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = MongoClient.connect(uri, opts)
      .then((client) => {
        console.log("Mongo Client Initiated");
        return {
          client,
          db: client.db(process.env.dbName),
        };
      })
      .catch((err) => {
        console.log("Error while connectinng to db => " + err);
      });
    cached.conn = await cached.promise;
    setInterval(handleRanking, process.env.rankingInterval * 60000);
    return cached.conn;
  }
};

export const getCollection = async (collectionName, schema) => {
  if (cached.collections[collectionName]) {
    console.log(
      collectionName +
        "- Collection is already exists in the global scope. Returning the collection"
    );
    return cached.collections[collectionName];
  }

  console.log(
    collectionName +
      "- Collection doesn't exists in the global scope. Making database call..."
  );

  const { db } = cached.conn ? cached.conn : await getDatabaseInstance();

  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  const collectionNames = collections.filter((c) => c.name === collectionName);

  if (collectionNames.length > 0) {
    console.log(
      collectionName +
        "- Collection exists in the Database. Returning the collection"
    );
    cached.collections[collectionName] = db.collection(collectionName);
  } else {
    console.log(
      collectionName +
        "- Collection doesn't exists in the Database. Creating and returning the collection"
    );
    db.createCollection(collectionName, { validator: schema });
    const colection = db.collection(collectionName);
    cached.collections[collectionName] = colection;
  }
  return cached.collections[collectionName];
};

export const removeCollection = async (collectionName, schema) => {
  try {
    const collection = await getCollection(collectionName, schema);
    const removedResponse = await collection.drop({});
    cached.collections[collectionName] = null;
    return removedResponse;
  } catch (err) {
    console.error("problem removin collection =>" + err);
  }
  return false;
};

export const getDocument = async (collectionName, schema, document) => {
  return await processQuery(
    dbOperation.readOne,
    collectionName,
    schema,
    document
  );
};

export const getDocuments = async (collectionName, schema, document) => {
  return await processQuery(
    dbOperation.readMany,
    collectionName,
    schema,
    document
  );
};

export const updateDocument = async (
  collectionName,
  schema,
  document,
  updateConition,
  queryOptions
) => {
  return await processQuery(
    dbOperation.updateOne,
    collectionName,
    schema,
    document,
    updateConition,
    queryOptions
  );
};

export const updateDocuments = async (
  collectionName,
  schema,
  document,
  updateCondition,
  queryOptions
) => {
  return await processQuery(
    dbOperation.updateMany,
    collectionName,
    schema,
    document,
    updateCondition,
    queryOptions
  );
};

export const deleteDocument = async (collectionName, schema, document) => {
  return await processQuery(
    dbOperation.deleteOne,
    collectionName,
    schema,
    document
  );
};

export const deleteDocuments = async (collectionName, schema, document) => {
  return await processQuery(
    dbOperation.deleteMany,
    collectionName,
    schema,
    document
  );
};

export const insertDocument = async (collectionName, schema, document) => {
  return await processQuery(
    dbOperation.createOne,
    collectionName,
    schema,
    document
  );
};

export const insertDocuments = async (collectionName, schema, document) => {
  return await processQuery(
    dbOperation.createMany,
    collectionName,
    schema,
    document
  );
};

export const processQuery = async (
  action,
  collectionName,
  schema,
  document,
  updateCondition = undefined,
  queryOptions = undefined
) => {
  try {
    const collection = await getCollection(collectionName, schema);
    switch (action) {
      case dbOperation.createOne:
        return [true, await collection.insertOne(document)];
      case dbOperation.createMany:
        return [true, await collection.insertMany(document)];
      case dbOperation.readOne:
        return [true, await collection.findOne(document)];
      case dbOperation.readMany:
        return [true, await collection.find(document)];
      case dbOperation.updateOne:
        return [
          true,
          await collection.updateOne(document, updateCondition, queryOptions),
        ];
      case dbOperation.updateMany:
        return [
          true,
          await collection.updateMany(document, updateCondition, queryOptions),
        ];
      case dbOperation.deleteOne:
        return [true, await collection.deleteOne(document)];
      case dbOperation.deleteMany:
        return [true, await collection.deleteMany(document)];
      default:
        return [false, "Invalid Query"];
    }
  } catch (err) {
    console.log("Error in process query function => " + err);
    return [false, err];
  }
};
