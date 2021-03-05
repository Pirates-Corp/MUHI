import BaseLayout from '../../components/Layouts/BaseLayout.jsx'
import GreetingHeader from '../../components/common/Header/GreetingHeader'
import Snackbar from '../../components/common/Popups/Snackbar.jsx'
export default function dashborad() {
  return (
    <div>
      <BaseLayout>
         <GreetingHeader/>
         <Snackbar message=" Incorrect Username or Password " time="1000" color="red" />
      </BaseLayout>
    </div>
  )
}
