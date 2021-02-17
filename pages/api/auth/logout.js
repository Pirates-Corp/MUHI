import { logout } from '../../../utils/db/account-handler'

export default async (req, res) => {
    await logout(req,res)
}
