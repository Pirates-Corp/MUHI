import {handleSubFieldInsert} from '../../../../../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleSubFieldInsert(req,res)
}
