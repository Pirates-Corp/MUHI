import { updatePassword } from '../../../../utils/account-handler'

export default async (req, res) => {
    await updatePassword(req,res)
}
