import { signup } from '../../../utils/db/account-manager'

export default async (req, res) => {
    await signup(req,res)
}
