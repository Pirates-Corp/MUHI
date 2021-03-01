import {handleDocumentDelete} from '../../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleDocumentDelete(req,res)
}
