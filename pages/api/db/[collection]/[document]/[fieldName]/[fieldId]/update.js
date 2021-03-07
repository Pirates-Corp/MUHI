import {handleFieldUpdate} from '../../../../../../../utils/db/db-handler'

export default async (req, res) => {
    await handleFieldUpdate(req,res)
}
