import { logout } from '../../../utils/account-handler'

export default async (req, res) => {
    await logout(req,res)
}
