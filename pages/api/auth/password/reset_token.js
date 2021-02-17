import { validateResetToken } from '../../../../utils/db/account-handler'

export default async (req, res) => {
    await validateResetToken(req,res)
}
