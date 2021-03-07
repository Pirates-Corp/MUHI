import { handleFieldRead } from "../../../../../../../utils/db/db-handler";

export default async (req, res) => {
  await handleFieldRead(req,res)
};
