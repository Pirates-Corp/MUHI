import { signup } from '../../../utils/db/account-handler'

export default async (req, res) => {
    await signup(req,res)
}
