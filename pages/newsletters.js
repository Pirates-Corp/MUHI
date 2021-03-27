import BaseLayout from '../components/Layouts/BaseLayout'
import PropPass from '../components/Layouts/PropPass'
import Newsletter from "../components/user/Newsletter/NewsletterInformationCard"
export default function newsletters() {
  return (
   <BaseLayout>
    <PropPass type="user"/>
       <Newsletter />
   </BaseLayout>
  )
}

