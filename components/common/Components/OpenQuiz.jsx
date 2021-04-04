import { useEffect, useState } from 'react';
import CenterLayout from '../../Layouts/CenterLayout';
import QuizTopicCard from '../../user/Quiz/QuizTopicCardComponent'
import PrimaryHeader from '../Header/PrimaryHeading';

const OpenQuiz = () => {
    let quizData;
    const [openQuizData , setOpenQuizData] = useState([])

    useEffect(async()=>{
            
            try {
              const allQuizzes = await fetch("http://localhost:3000/api/db/quiz/all", {
                method: "GET",
                headers: { "Content-Type": "application/json"},
              });
              quizData = await allQuizzes.json();
              quizData = quizData ? quizData : [];
            } catch (err) {
              console.error("Error in openQuiz useEffect =>" + err);
            }
            console.log(quizData);

            // quizData.map(quiz=>{
            //     if(quiz.quizTag.split('-')[0].toLowerCase() === 'open')
            //     {
            //         console.log(quiz);
            //     }
            // })
    },[])

    return(
     <CenterLayout>
         <PrimaryHeader heading="MUHI quiz" />
           {/* <QuizTopicCard props={props} /> */}
     </CenterLayout>
    )
}

export default OpenQuiz;