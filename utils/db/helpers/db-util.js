import { MongoClient } from "mongodb";
import { constants } from "../../constants";

const uri = process.env.dbConnectionString
  .replace("<dbHost>", process.env.dbHost)
  .replace("<dbName>", process.env.dbName)
  .replace("<dbUser>", encodeURIComponent(process.env.dbUser))
  .replace("<dbPass>", encodeURIComponent(process.env.dbPass));

  const dbOperation= {
    updateOne: "UPDATE_ONE",
    updateMany: "UPDATE_MANY",
    deleteOne: "DELETE_ONE",
    deleteMany: "DELETE_MANY",
    createOne: "CREATE_ONE",
    createMany: "CREATE_MANY",
    readOne: "READ_ONE",
    readMany: "READ_MANY",
  }

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = {
    conn: null,
    promise: null,
    user: null,
    collections: {},
  };
}

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
        "- Collection already exists in the Database. Returning the collection"
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
    console.log(removedResponse);
    return removedResponse;
  } catch (err) {
    console.error("problem removin collection =>" + err);
    return removedResponse;
  }
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
  updateConition,
  queryOptions
) => {
  return await processQuery(
    dbOperation.updateMany,
    collectionName,
    schema,
    document,
    updateConition,
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
  updateConition = undefined,
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
          await collection.updateOne(document, updateConition, queryOptions),
        ];
      case dbOperation.updateMany:
        return [
          true,
          await collection.updateMany(document, updateConition, queryOptions),
        ];
      case dbOperation.deleteOne:
        return [true, await collection.deleteOne(document)];
      case dbOperation.deleteMany:
        return [true, await collection.deleteMany(document)];
      default:
        return [false, "Invalid Query"];
    }
  } catch (err) {
    return [false, err];
  }
};
