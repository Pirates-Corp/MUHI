import { logout } from '../../../utils/db/account-manager'

export default async (req, res) => {
    await logout(req,res)
}
