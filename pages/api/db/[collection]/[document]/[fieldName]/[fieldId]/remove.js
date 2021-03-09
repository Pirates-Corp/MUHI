import {handleFieldDelete} from '../../../../../../../utils/db/db-handler'

export default async (req, res) => {
    await handleFieldDelete(req,res)
}
