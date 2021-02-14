import { getUserById } from "../../../../../utils/db/account-manager";

const userCollection = "user",
  reportsCollection = "reports",
  newsletterCollection = "newsletter",
  quizCollection = "quiz";

export default async (req, res) => {
  const collection = new String(req.query.collection).toLowerCase();
  const document = new String(req.query.collection).toLowerCase();
  if (collection === userCollection) {
    if (document === "all") {
      
    } else {
    }
  } else if (collection === reportsCollection) {
  } else if (collection === newsletterCollection) {
  } else if (collection === quizCollection) {
  } else {
    res.statusCode = 400;
    res.send("");
  }
};
