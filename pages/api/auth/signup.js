import { signup } from '../../../utils/db/account-manager'

export default async (req, res) => {
    await signup(req.query)
    res.statusCode = 200
    res.send("collection")
}
