import { forgotPassword } from '../../../utils/db/account-manager'

export default async (req, res) => {
    await forgotPassword(req,res)
}
