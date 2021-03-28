import QuizTopicCard from "../../components/user/Quiz/QuizTopicCardComponent";
import BaseLayout from "../../components/Layouts/BaseLayout.jsx";
import Propass from "../../components/Layouts/PropPass";
import { useEffect, useState } from "react";

function quiztopic({ props }) {
  return (
    <BaseLayout>
      <Propass type="user" />
      <QuizTopicCard props={props} />
    </BaseLayout>
  );
}

quiztopic.getInitialProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : null;

  const allQuizzes = await fetch("http://localhost/api/db/quiz/all", {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  const user = await fetch("http://localhost/api/db/user", {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  let quizData
  let currentUser
  try {
    quizData = await allQuizzes.json();
    quizData = quizData ? quizData : {}
    currentUser = await user.json()
    currentUser = currentUser ? currentUser : null
  } catch (err) {
    console.error("Error in get initial props =>"+err);
  }
  return { props: {quizData,currentUser} };
};

export default quiztopic;
