import { handleSubFieldRead } from "../../../../../../../../../utils/db/db-handler";

export default async (req, res) => {
  await handleSubFieldRead(req,res)
};
