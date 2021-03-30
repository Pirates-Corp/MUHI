import {useState} from 'react'
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import BaseLayout from '../../../components/Layouts/BaseLayout.jsx';
import Link from 'next/link';
import QuizInformationCard from '../../../components/common/Cards/QuizInformationCard'
export default function quizzes(props) {

 console.log(props);

 
 const [QuizInformationCardData , setQuizInformationCardData] = useState([]);
 
 let allQuiz = [];

 props.props.map((quiz)=>{

    
        
    let item = { 
      quizName : quiz.title,
      quizData : [
            {
              heading : "DURATION",
              icon : "/imgs/svgs/TimeTaken.svg",
              data: quiz.duration
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
              data: quiz.quizTag.split('-')[0]
            }
       ],
       buttonData:{
        apiUrl: "google.com",
        reqType:"POST",
        edit : true,
        delete : true,
        editAction : "editQuiz",
        deleteAction : "deleteQuiz",
        bodyData : {test : "hello"}
      }
     }

     allQuiz.push(item)
  })
  
  //setQuizInformationCardData();



















  return (
    <>
      <BaseLayout>
        <PrimaryHeading heading="Quiz"/>

        <Link href='quiz/create-quiz'>
            <a  className='blueBtn'>
               <img  className="mt-1" src="/imgs/svgs/OptionPlus.svg"></img>
               Create
            </a>
        </Link>


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

