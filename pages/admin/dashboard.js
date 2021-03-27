import BaseLayout from '../../components/Layouts/BaseLayout.jsx'
import GreetingHeader from '../../components/common/Header/GreetingHeader'
import Snackbar from '../../components/common/Popups/Snackbar.jsx'
export default function dashborad() {
  return (
    <div>
      <BaseLayout>
         <GreetingHeader/>
         <Snackbar message="Yaa done 😎😎" time="4000" color="green" />
      </BaseLayout>
    </div>
  )
}
