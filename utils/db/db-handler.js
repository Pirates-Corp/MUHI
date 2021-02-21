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
} from "./helpers/db-util";
import { accountSchema } from "./helpers/schema/account-schema";
import { quizSchema } from "./helpers/schema/quiz-schema";
import { reportSchema } from "./helpers/schema/report-schema";
import { newsLetterSchema } from "./helpers/schema/newsletter-schema";
import { authenticate } from "../account-handler";

const admin = "admin",
  moderator = "moderator",
  user = "user";

const collectionMap = {
  user: {
    collectionName: process.env.userCollection,
    schema: accountSchema,
  },
  quiz: {
    collectionName: process.env.quizCollection,
    schema: quizSchema,
  },
  newsletter: {
    collectionName: process.env.newsletterCollection,
    schema: newsLetterSchema,
  },
  report: {
    collectionName: process.env.reportsCollection,
    schema: reportSchema,
  },
};

/**
 * For now, default document option will be used only with Accounts collection. So returing current use details here.
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
    const collection = req.query?.collection;
    const collectionDetails = collectionMap[collection];
    if (collectionDetails) {
      const query = {};
      const cursor = await getDocuments(
        collectionDetails.collectionName,
        collectionDetails.schema,
        query
      );
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
              collectionMap[user].collectionName
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
  } catch (err) {
    console.log("Error getting user details " + err);
  }
  res.statusCode = resCode;
  resCode === 200 ? res.json(resBody) : res.send(resBody);
};

export const handleDocumentReadAll = async (req, res) => {
  let resCode = 400;
  let resBody = "";
  try {
    const result = await authenticate(req);
    if (result && result[0] === 200 && result[1].role === admin) {
      const collection = req.query?.collection;
      const collectionDetails = collectionMap[collection];
      if (collectionDetails) {
        const query = {};
        const cursor = await getDocuments(
          collectionDetails.collectionName,
          collectionDetails.schema,
          query
        );
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
                collectionMap[user].collectionName
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
    } else if (result && result[0] === 200) {
      resCode = 401;
      resBody =
        "Unauthorized action. Need admin or moderator handle to execute this operation";
      console.log(resBody);
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

export const handleDocumentInsert = async (req, res) => {};

export const handleDocumentDelete = async (req, res) => {};

export const handleDocumentUpdate = async (req, res) => {};

export const handleDocumentActivation = async (req, res) => {};

export const handleDocumentDeactivation = async (req, res) => {};

export const handleFieldRead = async (req, res) => {};

export const handleFieldInsert = async (req, res) => {};

export const handleFieldDelete = async (req, res) => {};

export const handleFieldupdate = async (req, res) => {};

// export const getDocumentOverview = async (req, res) => {};
