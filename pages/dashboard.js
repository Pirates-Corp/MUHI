import BaseLayout from '../components/Layouts/BaseLayout.jsx'
import PropPass from '../components/Layouts/PropPass'
import GreetingHeader from '../components/common/Header/GreetingHeader'
import OverallRowCard from '../components/common/Cards/OverallRowCards'

export default function dashborad() {
  return (
    <div>
      <BaseLayout>
         <PropPass type="user"/>
         <GreetingHeader for="user"/>
         <OverallRowCard />
      </BaseLayout>
    </div>
  )
}
