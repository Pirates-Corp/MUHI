import QuizTopicCard from "../../components/user/Quiz/QuizTopicCardComponent";
import BaseLayout from "../../components/Layouts/BaseLayout.jsx";
import Propass from "../../components/Layouts/PropPass";
import { useEffect, useState } from "react";

function quiztopic({ props }) {
  useEffect(() => {
    sessionStorage.setItem("quizArray", JSON.stringify(props));
  });

  return (
    <BaseLayout>
      <Propass type="user" />
      <QuizTopicCard props={props} />
    </BaseLayout>
  );
}

const removeCorrectAnswer = (quizData) => {
  quizData.map((quiz) => {
    if (quiz.hasOwnProperty("questions")) {
      quiz.questions.map((question)=>{
        delete question.correctAnswer
      })
    }
  });
};

quiztopic.getInitialProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : null;

  const res = await fetch("http://localhost/api/db/quiz/all", {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  let quizData;

  try {
    quizData = await res.json();
    if(quizData) {
      removeCorrectAnswer(quizData)
    } else {
      quizData = {}
    }
  } catch (err) {
    console.error(err);
  }
  return { props: quizData };
};

export default quiztopic;
