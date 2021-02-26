import { signup } from '../../../utils/account-handler'

export default async (req, res) => {
    await signup(req,res)
}
