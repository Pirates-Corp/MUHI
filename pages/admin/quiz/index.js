import {useState} from 'react'
import {useRouter} from 'next/router'
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import BaseLayout from '../../../components/Layouts/BaseLayout.jsx';
import QuizInformationCard from '../../../components/common/Cards/QuizInformationCard'
export default function quizzes(props) {

 console.log(props);

 const router = useRouter();
 
 const [QuizInformationCardData , setQuizInformationCardData] = useState([]);
 
 let allQuiz = [];

 props.props.map((quiz)=>{

    
        
    let item = { 
      quizName : quiz.title,
      quizData : [
            {
              heading : "DURATION",
              icon : "/imgs/svgs/TimeTaken.svg",
              data: parseInt(quiz.duration/60)
            },
            {
              heading : "START DATE",
              icon : "/imgs/svgs/StartDate.svg",
              data:  new Date(quiz.schedule.startTime).toString().split(' ').splice(0,4).join(' ')
            },
            {
              heading : "END DATE",
              icon : "/imgs/svgs/EndDate.svg",
              data:  new Date(quiz.schedule.endTime).toString().split(' ').splice(0,4).join(' ') 
            },
            {
              heading : "STATUS",
              icon : "/imgs/svgs/tick.svg",
              data: quiz.state.toString().toUpperCase()
            },
            {
              heading : "TYPE",
              icon : "/imgs/svgs/Door.svg",
              data: quiz.quizTag.split('-')[0].toUpperCase()
            },
            {
              heading : "RESULT",
              icon : "/imgs/svgs/Result.svg",
              data: (quiz.quizTag.split('-')[1]==="true") ? "Hidden" : "Visible"
            }
       ],
       buttonData:{
        apiUrl: "google.com",
        reqType:"POST",
        edit : true,
        delete : true,
        editAction : "editQuiz",
        deleteAction : "deleteQuiz",
        bodyData : {currentQuiz : quiz }
      }
     }

     allQuiz.push(item)
  })
  

  const creatQuiz=(e)=>{
    e.preventDefault();
    sessionStorage.clear();
    router.push('quiz/create-quiz');

  }
  

  return (
    <>
      <BaseLayout>
        <PrimaryHeading heading="Quiz"/>
 
        <button className='blueBtn' onClick={e=>{creatQuiz(e)}}>
        <img  className="mt-1" src="/imgs/svgs/OptionPlus.svg"></img>
        Create
        </button>

        <QuizInformationCard 
      view={{
         quizData : true,
         tagData :  false,
         showButtons : true
      }}
      apiData={allQuiz}
       />

    
    
      </BaseLayout>
    </>
  )
}


quizzes.getInitialProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : null;

  const quizRes = await fetch('http://localhost:3000/api/db/quiz/all', {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });


  let allQuiz;
  
   
    allQuiz = await quizRes.json();
    
  
  return { props: allQuiz };
};

