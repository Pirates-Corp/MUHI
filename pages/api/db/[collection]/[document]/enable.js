import { handleDocumentUpdate } from "../../../../../utils/db/db-handler";

export default async (req, res) => {
  await handleDocumentUpdate(req,res)
};
