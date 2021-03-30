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

 
  let currentUser = await user.json()



  const userReportRes = await fetch(`http://localhost/api/db/report/${currentUser.email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });



  let quizData
  let currentUserReport
  try {
    quizData = await allQuizzes.json();
    quizData = quizData ? quizData : {}
    currentUser = currentUser ? currentUser : null
    currentUserReport = await userReportRes.json();
  } catch (err) {
    console.error("Error in get initial props =>"+err);
  }
  return { props: {quizData,currentUser,currentUserReport} };
};

export default quiztopic;
