import { login } from '../../../utils/db/account-handler'

export default async (req, res) => {
    await login(req,res)
}
