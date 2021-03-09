import {handleSubFieldUpdate} from '../../../../../../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleSubFieldUpdate(req,res)
}
