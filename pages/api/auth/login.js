import { login } from '../../../utils/account-handler'

export default async (req, res) => {
    await login(req,res)
}
