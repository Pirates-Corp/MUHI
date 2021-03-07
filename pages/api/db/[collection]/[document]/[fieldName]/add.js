import {handleFieldInsert} from '../../../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleFieldInsert(req,res)
}
