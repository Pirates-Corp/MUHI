import { forgotPassword } from '../../../../utils/db/account-handler'

export default async (req, res) => {
    await forgotPassword(req,res)
}
