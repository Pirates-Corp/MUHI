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
import { accountSchema } from "./helpers/schema/account-schema";
import { quizSchema } from "./helpers/schema/quiz-schema";
import { reportSchema } from "./helpers/schema/report-schema";
import { newsLetterSchema } from "./helpers/schema/newsletter-schema";
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
  let resCode = 400;
  let resBody = "";
  try {
    const authResult = await authenticate(req);
    if (authResult && authResult[0] === 200) {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const collectionDetails = constants.collectionMap[collection];
      if (
        (authResult[1].role !== constants.roles.admin &&
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
      resBody = "Unknown err while getting user details";
      console.log(resBody);
    }
  } catch (err) {
    console.log("Error getting all documents =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleDocumentReadAll = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
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
  } catch (err) {
    console.log("Error getting all documents =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
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
          (authResult[1].role === constants.roles.moderator &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName) ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.user.collectionName) ||
          (authResult[1].role === constants.roles.user &&
            collectionDetails.collectionName ===
              constants.collectionMap.report.collectionName)
        ) {
          resCode = 401;
          resBody =
            "Unauthorized action. Need admin handle to execute this operation";
          console.log(resBody);
        } else {
          if (collectionDetails && documentReceived) {
            let mongoDocument = {};
            if (
              collectionDetails.collectionName ===
                constants.collectionMap.user.collectionName ||
              collectionDetails.collectionName ===
                constants.collectionMap.report.collectionName
            ) {
              mongoDocument._id = new String(documentReceived.id).toLowerCase();
              delete documentReceived.id;
            } else {
              mongoDocument._id = new String(
                documentReceived.title
              ).toLowerCase();
            }
            mongoDocument = { ...mongoDocument, ...documentReceived };
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
            const response = await removeCollection(
              collectionDetails.collectionName,
              collectionDetails.schema
            );
            if (response[0] && response[1].result.n > 0) {
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
    console.log("Error inserting document =>  " + err);
  }
  res.statusCode = resCode;
  res.send(resBody);
};

//to do
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
          const filter = { _id: new String(documentId).toLowerCase() };
          const updateDoc = {
            $set: {
              ...document,
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
              const updatedDoc = await getDocument(
                collectionDetails.collectionName,
                collectionDetails.schema,
                { _id: new String(documentId).toLowerCase() }
              );
              resBody = updatedDoc[1];
              console.log("Document updated => " + resBody);
            } else {
              resBody = "Update Failed for the doc => " + documentId;
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
    console.log("Error updating document =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
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
              console.log(queryResult[1].modifiedCount);
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
    const authResult = await authenticate(req);
    if (authResult && authResult[0] === 200) {
      const collection = decodeURIComponent(req.query?.collection);
      const documentId = decodeURIComponent(req.query?.document);
      const collectionDetails = constants.collectionMap[collection];
      if (
        (authResult[1].role !== constants.roles.admin &&
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
          // let document = null;
          // if (
          //   collectionDetails.collectionName ===
          //   constants.collectionMap.user.collectionName
          // ) {
          //   const user = await getUser(documentId);
          //   if (user) {
          //     document = { ...user };
          //   }
          // } else {
          //   const query = {
          //     _id: new String(documentId).toLowerCase(),
          //   };
          //   const queryResult = await getDocument(
          //     collectionDetails.collectionName,
          //     collectionDetails.schema,
          //     query
          //   );
          //   if (queryResult[0]) {
          //     document = queryResult[1];
          //   }
          // }
          if (document) {
            // if (
            //   collectionDetails.collectionName ===
            //   constants.collectionMap.user.collectionName
            // ) {
            //   delete document.password;
            //   delete document.resetToken;
            // }
            // resBody = document;
            // resCode = 200;
            // console.log(
            //   "returning the document for the id " +
            //     documentId +
            //     " =>" +
            //     JSON.stringify(resBody)
            // );
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
      resBody = "Unknown err while getting user details";
      console.log(resBody);
    }
  } catch (err) {
    console.log("Error getting all documents =>  " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleFieldInsert = async (req, res) => {};

export const handleFieldDelete = async (req, res) => {};

export const handleFieldUpdate = async (req, res) => {};

export const handleSubFieldRead = async (req, res) => {};

export const handleSubFieldInsert = async (req, res) => {};

export const handleSubFieldDelete = async (req, res) => {};

export const handleSubFieldUpdate = async (req, res) => {};

// export const getDocumentOverview = async (req, res) => {};
