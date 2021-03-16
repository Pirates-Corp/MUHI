import BaseLayout from '../Layouts/BaseLayout'
import PropPass from '../Layouts/PropPass'
import GreetingHeader from '../common/Header/GreetingHeader'
import OverallRowCard from '../common/Cards/OverallRowCards'
import QuizInformationCard from '../common/Cards/QuizInformationCard'
import Alert from '../common/Popups/Alert'
const userDashboard = () => {
  return (
    <>
    <Alert/>
    <BaseLayout>
      <PropPass type="user" />
      <GreetingHeader for="user" />
      <OverallRowCard />
      <QuizInformationCard />
    </BaseLayout>
    </>
  );
};

export default userDashboard;
