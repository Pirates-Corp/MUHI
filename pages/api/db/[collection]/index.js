import {handleDefaultDocumentRead} from '../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleDefaultDocumentRead(req,res)
}
