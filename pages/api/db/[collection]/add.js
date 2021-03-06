import {handleDocumentInsert} from '../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleDocumentInsert(req,res)
}
