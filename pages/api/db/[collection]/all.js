import {handleDocumentReadAll} from '../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleDocumentReadAll(req,res)
}
