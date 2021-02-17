import { updatePassword } from '../../../utils/db/account-manager'

export default async (req, res) => {
    await updatePassword(req,res)
}
