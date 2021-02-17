import { getUserDetails } from "../../../../utils/db/account-handler";

const userCollection = "user",
  reportsCollection = "reports";

export default async (req, res) => {
  const collection = new String(req.query.collection).toLowerCase()
  if (collection === userCollection) {
    await getUserDetails(req, res);
  } else if (collection === reportsCollection) {
  } else {
    res.statusCode = 400;
    res.send("");
  }
};
