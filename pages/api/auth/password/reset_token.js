import { validateResetToken } from '../../../../utils/account-handler'

export default async (req, res) => {
    await validateResetToken(req,res)
}
