import {
  getCollection,
  getDatabaseInstance,
  getDocument,
  getDocuments,
  insertDocument,
  insertDocuments,
  deleteDocument,
  deleteDocuments,
  updateDocument,
  updateDocuments,
  removeCollection,
} from "./helpers/db-util";
import { authenticate, getUser } from "../account-handler";
import { constants } from "../constants";

/**
 * For now, default document option will be used only with Accounts collection. So returing current user details here.
 *
 * @param {*} req
 * @param {*} res
 */
export const handleDefaultDocumentRead = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    const result = await authenticate(req);
    if (result && result[0] === 200) {
      resCode = 200;
      resBody = result[1];
    } else if (result) {
      res.statusCode = result[0];
      resBody = "Problem in authentication => " + result[1];
      console.log(resBody);
    } else {
      res.statusCode = 400;
      const resText = "authentication err while getting user details";
      console.log(resBody);
    }
  } catch (err) {
    console.log("Error getting user details " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleDocumentReadById = async (req, res) => {
  let resCode = 400,
    resBody = "";
  if (req.method === "GET") {
    const result = await getDoc(req);
    resCode = result[0];
    resBody = result[1];
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleDocumentReadAll = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "GET") {
      const result = await authenticate(req);
      if (result && result[0] === 200) {
        const collection = decodeURIComponent(req.query?.collection);
        const collectionDetails = constants.collectionMap[collection];
        if (
          (result[1].role === constants.roles.moderator &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName) ||
          (result[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName) ||
          (result[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.report.collectionName)
        ) {
          resCode = 401;
          resBody =
            "Unauthorized action. Need admin handle to execute this operation";
          console.log(resBody);
        } else {
          if (collectionDetails) {
            const query = {};
            const queryResponse = await getDocuments(
              collectionDetails.collectionName,
              collectionDetails.schema,
              query
            );
            const cursor = queryResponse[0] ? queryResponse[1] : undefined;
            if (cursor) {
              const collectionsArray = [];
              if ((await cursor.count()) === 0) {
                console.log(
                  "No documents found in the collection => " +
                    collectionDetails.collectionName
                );
              } else {
                await cursor.forEach((doc) => {
                  if (
                    collectionDetails.collectionName ===
                    constants.collectionMap[constants.roles.user].collectionName
                  ) {
                    delete doc.password;
                    delete doc.resetToken;
                  } else if (
                    collectionDetails.collectionName ===
                      constants.collectionMap.quiz.collectionName &&
                    constants.roles.admin !== result[1].role
                  ) {
                    doc.questions.map((question) => {
                      delete question.correctAnswer;
                    });
                  }
                  collectionsArray.push(doc);
                });
              }
              resCode = 200;
              resBody = collectionsArray;
            } else {
              resBody = "Problem in Cursor fetched from DB";
              console.log(resBody);
            }
          } else {
            resBody = "Invalid Collection";
            console.log(resBody);
          }
        }
      } else if (result) {
        resCode = result[0];
        resBody = "Problem in authentication => " + result[1];
        console.log(resBody);
      } else {
        resCode = 400;
        resBody = "Unknown err while getting user details";
        console.log(resBody);
      }
    }
  } catch (err) {
    console.log("Error getting all documents =>  " + err);
  }
  res.statusCode = resCode;
  resCode[0] === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleDocumentInsert = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method !== "PUT") {
      resBody = "Invalid request";
    } else {
      const authResult = await authenticate(req);
      if (authResult && authResult[0] === 200) {
        const collection = decodeURIComponent(req.query?.collection);
        const documentReceived = req.body;
        const collectionDetails = constants.collectionMap[collection];
        if (
          collectionDetails.collectionName ===
            constants.collectionMap.user.collectionName ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.newsletter.collectionName) ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.quiz.collectionName)
        ) {
          resCode = 401;
          resBody =
            "Unauthorized action. Need admin handle to execute this operation";
          console.log(resBody);
        } else {
          const result = await insertDoc(collectionDetails, documentReceived);
          if (result) {
            resCode = result[0];
            resBody = result[1];
          }
        }
      } else if (authResult) {
        resCode = authResult[0];
        resBody = "Problem in authentication => " + authResult[1];
        console.log(resBody);
      } else {
        resCode = 400;
        resBody = "Unknown err while getting user details";
        console.log(resBody);
      }
    }
  } catch (err) {
    console.log("Error inserting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 201 ? res.json(resBody) : res.send(resBody);
};

export const handleDocumentDelete = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method !== "DELETE") {
      resBody = "Invalid request";
    } else {
      const authResult = await authenticate(req);
      if (authResult && authResult[0] === 200) {
        const collection = decodeURIComponent(req.query?.collection);
        const documentId = decodeURIComponent(req.query?.document);
        const collectionDetails = constants.collectionMap[collection];
        if (
          (authResult[1].role === constants.roles.moderator &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName) ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName &&
            authResult[1].email !== documentId) ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.report.collectionName &&
            authResult[1].email !== documentId)
        ) {
          resCode = 401;
          resBody =
            "Unauthorized action. Need admin handle to execute this operation";
          console.log(resBody);
        } else {
          const mongoDocument = { _id: new String(documentId).toLowerCase() };
          if (mongoDocument._id === "all") {
            // const response = await deleteDocuments(
            //   collectionDetails.collectionName,
            //   collectionDetails.schema,
            //   {}
            // );
            const response = await removeCollection(
              collectionDetails.collectionName,
              collectionDetails.schema
            );
            if (response) {
              resCode = 200;
              resBody =
                "Deleted all documents from " +
                collectionDetails.collectionName +
                " collection";
            } else {
              resBody =
                "Problem deleting all documents from " +
                collectionDetails.collectionName +
                " collection";
            }
          } else {
            if (collectionDetails) {
              const queryResponse = await deleteDocument(
                collectionDetails.collectionName,
                collectionDetails.schema,
                mongoDocument
              );
              if (queryResponse[0] && queryResponse[1].deletedCount === 1) {
                resCode = 200;
                resBody =
                  "Deleted doc => " +
                  documentId +
                  " from " +
                  collectionDetails.collectionName +
                  " collection";
              } else {
                resBody = "Problem deleting the document => " + documentId;
              }
              console.log(resBody);
            } else {
              resBody = "Invalid Collection";
              console.log(resBody);
            }
          }
        }
      } else if (authResult) {
        resCode = authResult[0];
        resBody = "Problem in authentication => " + authResult[1];
        console.log(resBody);
      } else {
        resCode = 400;
        resBody = "Unknown err while getting user details";
        console.log(resBody);
      }
    }
  } catch (err) {
    console.log("Error Deleting document =>  " + err);
  }
  res.statusCode = resCode;
  res.send(resBody);
};

export const handleDocumentUpdate = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method !== "PUT") {
      resBody = "Invalid request";
    } else {
      const authResult = await authenticate(req);
      if (authResult && authResult[0] === 200) {
        const collection = decodeURIComponent(req.query?.collection);
        const documentId = decodeURIComponent(req.query?.document);
        const document = req.body;
        const collectionDetails = constants.collectionMap[collection];
        if (
          (authResult[1].role === constants.roles.moderator &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName) ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName &&
            authResult[1].email !== documentId) ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.report.collectionName &&
            authResult[1].email !== documentId)
        ) {
          resCode = 401;
          resBody =
            "Unauthorized action. Need admin handle to execute this operation";
          console.log(resBody);
        } else {
          if (collectionDetails) {
            const result = await updateDoc(
              collectionDetails,
              documentId,
              document
            );
            resCode = result[0];
            resBody = result[1];
          } else {
            resBody = "Invalid Collection";
            console.log(resBody);
          }
        }
      } else if (authResult) {
        resCode = authResult[0];
        resBody = "Problem in authentication => " + authResult[1];
        console.log(resBody);
      } else {
        resCode = 400;
        resBody = "Unknown err while getting user details";
        console.log(resBody);
      }
    }
  } catch (err) {
    console.log("Error updating document =>  " + err);
  }
  res.statusCode = resCode;
  resCode[0] === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleDocumentActivation = async (req, res, stateToBeChanged) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method !== "PUT") {
      resBody = "Invalid request";
    } else {
      const authResult = await authenticate(req);
      if (authResult && authResult[0] === 200) {
        const collection = decodeURIComponent(req.query?.collection);
        const documentId = decodeURIComponent(req.query?.document);
        const collectionDetails = constants.collectionMap[collection];
        if (authResult[1].role === constants.roles.user) {
          resCode = 401;
          resBody =
            "Unauthorized action. Need admin handle to execute this operation";
          console.log(resBody);
        } else {
          const filter = { _id: new String(documentId).toLowerCase() };
          const updateDoc = {
            $set: {
              state: stateToBeChanged,
            },
          };
          const options = { upsert: false };
          if (collectionDetails) {
            const queryResult = await updateDocument(
              collectionDetails.collectionName,
              collectionDetails.schema,
              filter,
              updateDoc,
              options
            );
            if (queryResult[0] && queryResult[1].modifiedCount === 1) {
              resCode = 200;
              resBody =
                "state is changed to " +
                stateToBeChanged +
                " for the doc => " +
                documentId;
              console.log(resBody);
            } else {
              resBody =
                "Problem changing state is changed to " +
                stateToBeChanged +
                " for the doc => " +
                documentId;
              console.log(resBody);
            }
          } else {
            resBody = "Invalid Collection";
            console.log(resBody);
          }
        }
      } else if (authResult) {
        resCode = authResult[0];
        resBody = "Problem in authentication => " + authResult[1];
        console.log(resBody);
      } else {
        resCode = 400;
        resBody = "Unknown err while getting user details";
        console.log(resBody);
      }
    }
  } catch (err) {
    console.log("Error changing state of the document =>  " + err);
  }
  res.statusCode = resCode;
  res.send(resBody);
};

export const handleFieldRead = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "GET") {
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const fieldId = decodeURIComponent(req.query?.fieldId)
        .trim()
        .toLowerCase();
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        const document = result[1];
        const matchedFields = document[fieldName].filter((doc) => {
          return doc.id == fieldId;
        });
        if (matchedFields[0]) {
          resCode = 200;
          resBody = matchedFields[0];
          console.log("Returning doc " + JSON.stringify(matchedFields[0]));
        } else {
          resCode = 404;
          resBody =
            fieldName +
            " with id `" +
            fieldId +
            "` not found for the doc `" +
            decodeURIComponent(req.query?.document) +
            "`";
        }
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleFieldInsert = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "PUT") {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const collectionDetails = constants.collectionMap[collection];
      const doc = req.body;
      doc.id = doc.id.trim().toLowerCase();
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        const document = result[1];
        document[fieldName].push(doc);
        const updateResponse = await updateDoc(
          collectionDetails,
          documentId,
          document
        );
        resCode = updateResponse[0];
        resBody = updateResponse[1];
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleFieldDelete = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "DELETE") {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const fieldId = decodeURIComponent(req.query?.fieldId)
        .trim()
        .toLowerCase();
      const collectionDetails = constants.collectionMap[collection];
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        const document = result[1];
        const matchedFields = document[fieldName].filter((doc) => {
          return doc.id != fieldId;
        });
        document[fieldName] = matchedFields;
        const updateResponse = await updateDoc(
          collectionDetails,
          documentId,
          document
        );
        resCode = updateResponse[0];
        resBody = updateResponse[1];
        console.log(resBody);
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleFieldUpdate = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  console.log(req);
  try {
    if (req.method === "PUT") {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const fieldId = decodeURIComponent(req.query?.fieldId)
        .trim()
        .toLowerCase();
      const newDoc = req.body;
      const collectionDetails = constants.collectionMap[collection];
      newDoc.id =
        collectionDetails.collectionName ===
        constants.collectionMap.quiz.collectionName
          ? parseInt(fieldId)
          : fieldId;
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        const document = result[1];
        let modified = false;
        const modifiedArray = document[fieldName].map((doc) => {
          if (doc.id.toLowerCase().trim() == fieldId) {
            console.log("found doc");
            doc = newDoc;
            modified = true;
          }
          return doc;
        });
        if (modified === false) {
          modifiedArray.push(newDoc);
        }
        document[fieldName] = modifiedArray;
        const updateResponse = await updateDoc(
          collectionDetails,
          documentId,
          document
        );
        resCode = updateResponse[0];
        resBody = updateResponse[1];
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleSubFieldRead = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "GET") {
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const fieldId = decodeURIComponent(req.query?.fieldId)
        .trim()
        .toLowerCase();
      const subFieldName = decodeURIComponent(req.query?.subFieldName);
      const subFieldId = decodeURIComponent(req.query?.subFieldId)
        .trim()
        .toLowerCase();
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        const document = result[1];
        const matchedFields = document[fieldName].filter((doc) => {
          return doc.id == fieldId;
        });
        if (matchedFields[0]) {
          const matchedSubFiels = matchedFields[0][subFieldName].filter(
            (doc) => {
              return doc.id == subFieldId;
            }
          );
          if (matchedSubFiels[0]) {
            resCode = 200;
            resBody = matchedSubFiels[0];
            console.log("Returning doc " + JSON.stringify(matchedFields[0]));
          } else {
            resCode = 404;
          }
        } else {
          resCode = 404;
          resBody =
            fieldName +
            " with id `" +
            fieldId +
            "` not found for the doc `" +
            decodeURIComponent(req.query?.document) +
            "`";
        }
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleSubFieldInsert = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "PUT") {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const collectionDetails = constants.collectionMap[collection];
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const fieldId = decodeURIComponent(req.query?.fieldId)
        .trim()
        .toLowerCase();
      const subFieldName = decodeURIComponent(req.query?.subFieldName);
      const newDoc = req.body;
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        const document = result[1];
        const matchedFields = document[fieldName].filter((doc) => {
          return doc.id == fieldId;
        });
        if (
          collectionDetails.collectionName ===
            constants.collectionMap.report.collectionName &&
          !newDoc.hasOwnProperty("result")
        ) {
          const quizResult = await getDocument(
            constants.collectionMap.quiz.collectionName,
            constants.collectionMap.quiz.schema,
            { _id: new String(fieldId).toLowerCase() }
          );
          if (quizResult && quizResult[0] && quizResult[1] !== null) {
            quizResult[1].questions.map((question) => {
              if (question.id === newDoc.id) {
                if (question.correctAnswer === newDoc.answer) {
                  newDoc.result = 1;
                } else {
                  newDoc.result = 0;
                }
              }
            });
          } else {
            console.log(collection + " document is null for id " + fieldId);
          }
        }

        if (matchedFields[0]) {
          matchedFields[0][subFieldName].push(newDoc);

          const updateResponse = await updateDoc(
            collectionDetails,
            documentId,
            document
          );
          resCode = updateResponse[0];
          resBody = updateResponse[1];
        } else {
          resCode = 404;
          resBody =
            fieldName +
            " with id `" +
            fieldId +
            "` not found for the doc `" +
            decodeURIComponent(req.query?.document) +
            "`";
        }
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleSubFieldDelete = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "DELETE") {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const collectionDetails = constants.collectionMap[collection];
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const fieldId = decodeURIComponent(req.query?.fieldId)
        .trim()
        .toLowerCase();
      const subFieldName = decodeURIComponent(req.query?.subFieldName);
      const subFieldId = decodeURIComponent(req.query?.subFieldId)
        .trim()
        .toLowerCase();
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        const document = result[1];
        const matchedFields = document[fieldName].filter((doc) => {
          return doc.id == fieldId;
        });
        if (matchedFields[0]) {
          const matchedSubFields = matchedFields[0][subFieldName].filter(
            (doc) => {
              return doc.id != subFieldId;
            }
          );
          matchedFields[0][subFieldName] = matchedSubFields;
          const updateResponse = await updateDoc(
            collectionDetails,
            documentId,
            { ...document }
          );
          resCode = updateResponse[0];
          resBody = updateResponse[1];
        } else {
          resCode = 404;
          resBody =
            fieldName +
            " with fieldid `" +
            fieldId +
            "` not found for the doc `" +
            decodeURIComponent(req.query?.document) +
            "`";
        }
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleSubFieldUpdate = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    if (req.method === "PUT") {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const collectionDetails = constants.collectionMap[collection];
      const fieldName = decodeURIComponent(req.query?.fieldName);
      const fieldId = decodeURIComponent(req.query?.fieldId)
        .trim()
        .toLowerCase();
      const subFieldName = decodeURIComponent(req.query?.subFieldName);
      const subFieldId = decodeURIComponent(req.query?.subFieldId)
        .trim()
        .toLowerCase();
      const newDoc = req?.body;
      newDoc.id = parseInt(subFieldId);
      const result = await getDoc(req);
      if (result && result[0] === 200) {
        let duration = newDoc.duration ? newDoc.duration : -1;
        delete newDoc.duration;
        const document = result[1];
        const matchedFields = document[fieldName].filter((doc) => {
          return doc.id == fieldId;
        });
        if (matchedFields[0]) {
          let modifiedSubField = false;
          const modifiedSubFields = matchedFields[0][subFieldName].map(
            (doc) => {
              if (doc.id == newDoc.id) {
                modifiedSubField = true;
                doc = newDoc;
              }
              return doc;
            }
          );
          if (!modifiedSubField) {
            modifiedSubFields.push(newDoc);
          }
          matchedFields[0][subFieldName] = modifiedSubFields;
          if (
            collectionDetails.collectionName ===
            constants.collectionMap.report.collectionName
          ) {
            await updateResultsInQuizReports(matchedFields[0], duration);
            console.log("Result updated doc =>", matchedFields[0]);
          }

          if (modifiedSubFields[0]) {
            const updateResponse = await updateDoc(
              collectionDetails,
              documentId,
              document
            );
            resCode = updateResponse[0];
            resBody = updateResponse[1];
          }
        } else {
          resCode = 404;
          resBody =
            fieldName +
            " with id `" +
            fieldId +
            "` not found for the doc `" +
            decodeURIComponent(req.query?.document) +
            "`";
        }
      } else {
        resCode = result[0];
        resBody = result[1];
      }
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

// export const getDocumentOverview = async (req, res) => {};

/**
 * Helper functions
 */

const getDoc = async (req) => {
  let resCode, resBody;
  try {
    const authResult = await authenticate(req);
    if (authResult && authResult[0] === 200) {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document).trim().toLowerCase();
      const collectionDetails = constants.collectionMap[collection];
      if (
        (authResult[1].role !== constants.roles.admin &&
          collectionDetails.collectionName ===
            constants.collectionMap.user.collectionName &&
          authResult[1]._id !== documentId) ||
        (authResult[1].role === constants.roles.user &&
          collectionDetails.collectionName ===
            constants.collectionMap.report.collectionName &&
          authResult[1]._id !== documentId)
      ) {
        resCode = 401;
        resBody =
          "Unauthorized action. Need admin handle to execute this operation";
        console.log(resBody);
      } else {
        if (collectionDetails) {
          let document = null;
          if (
            collectionDetails.collectionName ===
            constants.collectionMap.user.collectionName
          ) {
            const user = await getUser(documentId);
            if (user) {
              document = { ...user };
            }
          } else {
            const query = {
              _id: new String(documentId).toLowerCase(),
            };
            const queryResult = await getDocument(
              collectionDetails.collectionName,
              collectionDetails.schema,
              query
            );
            if (queryResult[0]) {
              document = queryResult[1];
            }
          }
          if (document) {
            if (
              collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName
            ) {
              delete document.password;
              delete document.resetToken;
            } else if (
              collectionDetails.collectionName ===
                constants.collectionMap.quiz.collectionName &&
              constants.roles.user === authResult[1].role
            ) {
              document.questions.map((question) => {
                delete question.correctAnswer;
              });
            } else if (
              collectionDetails.collectionName ===
                constants.collectionMap.report.collectionName &&
              constants.roles.user === authResult[1].role
            ) {
              document.reports.map((report) => {
                report.report.map((questionReport) => {
                  delete questionReport.result;
                });
              });
            }
            resBody = document;
            resCode = 200;
            console.log(
              "returning the document for the id " +
                documentId +
                " =>" +
                JSON.stringify(resBody)
            );
          } else {
            resCode = 404;
            resBody =
              "Problem in document fetched from DB. Document may not be available in DB !";
            console.log(resBody);
          }
        } else {
          resBody = "Invalid Collection";
          console.log(resBody);
        }
      }
    } else if (authResult) {
      resCode = authResult[0];
      resBody = "Problem in authentication => " + authResult[1];
      console.log(resBody);
    } else {
      resCode = 400;
      resBody = "Unknown err while getting document";
      console.log(resBody);
    }
  } catch (err) {
    console.log("Error getting document =>  " + err);
  }
  return [resCode, resBody];
};

const updateDoc = async (collectionDetails, documentId, document) => {
  let resCode = 400;
  let resBody = "";
  try {
    const filter = { _id: new String(documentId).toLowerCase() };
    const updateDoc = {
      $set: {
        ...document,
      },
    };
    const options = { upsert: false };
    if (collectionDetails) {
      const internalValidationResp = validateDoc([document]);
      if (internalValidationResp) {
        const queryResult = await updateDocument(
          collectionDetails.collectionName,
          collectionDetails.schema,
          filter,
          updateDoc,
          options
        );
        if (queryResult[0] && queryResult[1].modifiedCount >= 1) {
          resCode = 200;
          const updatedDoc = await getDocument(
            collectionDetails.collectionName,
            collectionDetails.schema,
            { _id: new String(documentId).toLowerCase() }
          );
          resBody = updatedDoc[1];
          console.log("Document updated => " + JSON.stringify(resBody));
        } else {
          resBody =
            "Update Failed for the doc => " +
            documentId +
            " Error" +
            queryResult[1];
        }
      } else {
        resCode = 409;
        resBody = "Duplicate id found in the doc";
        console.log(resBody);
      }
    } else {
      resBody = "Invalid Collection";
      console.log(resBody);
    }
  } catch (err) {
    console.log("Error updating document =>  " + err);
  }
  return [resCode, resBody];
};

const validateDoc = (array) => {
  const documentArray = [...array];
  const validator = [];
  for (let doc of documentArray) {
    for (let key in doc) {
      if (
        Array.isArray(doc[key]) &&
        doc[key].length > 0 &&
        doc[key][0].hasOwnProperty("id")
      ) {
        // console.log("Has Id Property and is array");
        if (validateDoc(doc[key]) === false) {
          return false;
        }
      }
    }
    if (doc.hasOwnProperty("id")) {
      // console.log("Has Id Property and is object");
      const tempId = doc.id;
      doc.id = isNaN(doc.id) ? doc.id.trim().toLowerCase() : doc.id;
      if (!validator.includes(tempId)) {
        validator.push(tempId);
        // console.log(validator);
      } else {
        console.log(
          "Duplicate id found in the doc. Document validation failed. Returning false."
        );
        return false;
      }
    }
  }
  // console.log("Internal Document validation succeeded. Returning true.");
  return true;
};

const insertDoc = async (collectionDetails, doc) => {
  let resCode = 400,
    resBody = "";
  try {
    if (collectionDetails && doc) {
      let mongoDocument = {};
      if (
        collectionDetails.collectionName ===
          constants.collectionMap.user.collectionName ||
        collectionDetails.collectionName ===
          constants.collectionMap.report.collectionName
      ) {
        mongoDocument._id = new String(doc.id).toLowerCase();
        delete doc.id;
      } else {
        mongoDocument._id = new String(doc.title).toLowerCase();
      }
      mongoDocument = { ...mongoDocument, ...doc };
      const internalValidationResp = validateDoc([mongoDocument]);
      if (internalValidationResp) {
        const queryResponse = await insertDocument(
          collectionDetails.collectionName,
          collectionDetails.schema,
          mongoDocument
        );
        if (queryResponse[0]) {
          resCode = 201;
          resBody = { ...mongoDocument };
        } else {
          if (queryResponse[1].code == 11000) {
            resCode = 409;
          }
          resBody =
            "Insertion completed with the response => " +
            queryResponse +
            " | " +
            JSON.stringify(mongoDocument);
        }
      } else {
        resCode = 409;
        resBody = "Duplicate id found in the doc";
        console.log(resBody);
      }
    } else {
      resBody = "Invalid Collection";
      console.log(resBody);
    }
  } catch (err) {
    console.error("Error while inserting document => ", err);
  }
  return [resCode, resBody];
};

export const addUserReport = async (id) => {
  const newReport = {
    id,
    rank: 0,
    avgScore: 0,
    reports: [],
  };
  const result = await insertDoc(constants.collectionMap.report, newReport);
  return result;
};

const updateResultsInQuizReports = async (doc, duration = -1) => {
  const quizResult = await getDocument(
    constants.collectionMap.quiz.collectionName,
    constants.collectionMap.quiz.schema,
    { _id: new String(doc.id).toLowerCase().trim() }
  );
  // console.log("quizResult for corresponding report is => ",quizResult);
  if (quizResult && quizResult[0] == true && quizResult[1] !== null) {
    console.log("doc   ===>   ", doc);
    doc.score.taken = 0
    quizResult[1].questions.map((question) => {
      doc.report.map((report) => {
        if (question.id === report.id) {
          if (
            question.correctAnswer.trim().toLowerCase() ===
            report.answer.trim().toLowerCase()
          ) {
            report.result = 1;
            doc.score.taken = doc.score.taken + 1;
          } else {
            report.result = 0;
          }
          if (!doc.questionsAttended.includes(question.id))
            doc.questionsAttended.push(question.id);
        }
      });
    });
    if (duration >= 0)  doc.time.taken = duration;
    if(doc.questionsAttended.length === quizResult[1].questions.length) doc.status = 1
  } else {
    console.log("Report document is null for id " + doc.id);
  }
};
