import UpdateProfile from '../components/common/Components/UpdateProfile'
import BaseLayout from '../components/Layouts/BaseLayout'
import PropPass from '../components/Layouts/PropPass'
export default function profile() {
  return (
   <BaseLayout>
    <PropPass type="user"/>
    <UpdateProfile />
   </BaseLayout>
  )
}

