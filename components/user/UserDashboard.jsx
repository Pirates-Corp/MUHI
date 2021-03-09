import BaseLayout from '../Layouts/BaseLayout'
import PropPass from '../Layouts/PropPass'
import GreetingHeader from '../common/Header/GreetingHeader'
import OverallRowCard from '../common/Cards/OverallRowCards'
const userDashboard = () => {
  return (
    <BaseLayout>
      <PropPass type="user" />
      <GreetingHeader for="user" />
      <OverallRowCard />
    </BaseLayout>
  );
};

export default userDashboard;
