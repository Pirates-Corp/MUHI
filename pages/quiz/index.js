import QuizTopicCard from "../../components/user/Quiz/QuizTopicCardComponent"
import BaseLayout from '../../components/Layouts/BaseLayout.jsx'
import Propass from '../../components/Layouts/PropPass'
export default function quiztopic() {
  return (
     <BaseLayout>
        <Propass type="user" />
         <QuizTopicCard/>
     </BaseLayout>
  )
}
