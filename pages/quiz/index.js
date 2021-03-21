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

  const res = await fetch("http://localhost/api/db/quiz/all", {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  let quizData;

  try {
    quizData = await res.json();
    quizData = quizData ? quizData : {}
  } catch (err) {
    console.error(err);
  }
  return { props: quizData };
};

export default quiztopic;
