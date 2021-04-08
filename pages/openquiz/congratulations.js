import QuizResultCard from "../../components/user/Quiz/QuizResultCardComponent";
import CenterLayout from "../../components/Layouts/CenterLayout.jsx";
import { useEffect, useState } from "react";
export default function quiztopic() {

  const [quizData,setQuizData] = useState({})

  const [userId,setUserId] = useState(null)

  useEffect(()=>{
    const quizDataInLocalStorage = localStorage.getItem("currentQuiz")
    const userDataInLocalStorage = localStorage.getItem("userId")
    if(JSON.stringify(quizData) !== JSON.stringify(quizDataInLocalStorage)) setQuizData(JSON.parse(quizDataInLocalStorage))
    if(JSON.stringify(userId) !== JSON.stringify(userDataInLocalStorage)) setUserId(JSON.parse(userDataInLocalStorage))
  })

  const syllabus = {}

  let marksTaken = 0

  let totalMarks = quizData.hasOwnProperty('questions') ? quizData.questions.length : 0

  if(quizData.hasOwnProperty('questions')) {
    quizData.questions.map((question) => {
      syllabus[question.chapter + " - " + question.section] = question.syllabus;
      if(question.answer === question.correctAnswer) {
        marksTaken+=1
      }
    })
  }

  totalMarks = totalMarks > 0 ? marksTaken+"/"+totalMarks : ""

  return (
    <CenterLayout>
      <QuizResultCard props={{syllabus,totalMarks,userId}} />
    </CenterLayout>
  );
}