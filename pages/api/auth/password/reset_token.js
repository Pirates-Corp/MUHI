import { validateResetToken } from '../../../../utils/db/account-manager'

export default async (req, res) => {
    await validateResetToken(req,res)
}
