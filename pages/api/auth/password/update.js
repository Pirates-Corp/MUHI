import { updatePassword } from '../../../../utils/db/account-handler'

export default async (req, res) => {
    await updatePassword(req,res)
}
