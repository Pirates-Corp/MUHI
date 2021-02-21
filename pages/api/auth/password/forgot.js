import { forgotPassword } from '../../../../utils/account-handler'

export default async (req, res) => {
    await forgotPassword(req,res)
}
