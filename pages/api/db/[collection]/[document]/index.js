import { handleDocumentReadById } from "../../../../../utils/db/db-handler";

export default async (req, res) => {
  await handleDocumentReadById(req,res)
};
