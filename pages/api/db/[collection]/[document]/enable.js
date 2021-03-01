import { handleDocumentActivation } from "../../../../../utils/db/db-handler";

export default async (req, res) => {
  await handleDocumentActivation(req,res,'Active')
};
