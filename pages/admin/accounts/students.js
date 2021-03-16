import BaseLayout from '../../../components/Layouts/BaseLayout.jsx'
import StudentAccount from "../../../components/admin/AccountManagement/StudentAccounts"
export default function accounts() {
  return (
    <div>
      <BaseLayout>
        <StudentAccount />
      </BaseLayout>
    </div>
  )
}
