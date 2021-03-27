import BaseLayout from '../../../components/Layouts/BaseLayout.jsx'
import ManageAccounts from "../../../components/admin/AccountManagement/ManageAccounts";
export default function accounts() {
  return (
    <div>
      <BaseLayout>
       <ManageAccounts/>
      </BaseLayout>
    </div>
  )
}
