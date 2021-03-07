import {handleSubFieldDelete} from '../../../../../../../../../utils/db/db-handler'

export default async (req, res) => {
  await handleSubFieldDelete(req,res)
}
