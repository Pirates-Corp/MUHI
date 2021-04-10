import QuizResultCard from "../../components/user/Quiz/QuizResultCardComponent";
import CenterLayout from "../../components/Layouts/CenterLayout.jsx";
import { useEffect, useState } from "react";
export default function quiztopic() {

  const [quizData,setQuizData] = useState({})

  const [studentData,setUserData] = useState(null)

  useEffect(()=>{
    const quizDataInLocalStorage = localStorage.getItem("currentQuiz")
    const userDataInLocalStorage = localStorage.getItem("Student")
    if(JSON.stringify(quizData) !== JSON.stringify(quizDataInLocalStorage)) setQuizData(JSON.parse(quizDataInLocalStorage))
    if(JSON.stringify(studentData) !== JSON.stringify(userDataInLocalStorage))  setUserData(JSON.parse(userDataInLocalStorage))
  },[])

  const syllabus = {}

  let marksTaken = 0

  let totalMarks = quizData.hasOwnProperty('questions') || quizData==null ? quizData.questions.length : 0

  if(quizData.hasOwnProperty('questions')) {
    quizData.questions.map((question) => {
      syllabus[question.chapter + " - " + question.section] = question.syllabus;
      if(question.answer === question.correctAnswer) {
        marksTaken+=1
      }
    })
    let studentReport = {...studentData}
    studentReport.score = marksTaken
    studentReport.addedTime = Date.now()
    fetch(`/api/db/auser/add`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentReport)
    }).then(res => {
      if(res.status === 201) console.log("Anonymose user data successfully pushed into DB");
    });
  }

  totalMarks = totalMarks > 0 ? marksTaken+"/"+totalMarks : ""

  return (
    <CenterLayout>
      <QuizResultCard props={{syllabus,totalMarks,userId : (studentData) ? studentData.name:""}} />
    </CenterLayout>
  );
}