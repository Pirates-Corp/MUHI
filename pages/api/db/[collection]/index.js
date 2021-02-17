import { getUserDetails } from '../../../../utils/db/account-manager'

export default async (req, res) => {    
    await getUserDetails(req,res)
}
  