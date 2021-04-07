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
  let currentUser;
  let quizData;
  let currentUserReport;

  try {
    const cookie = ctx.req ? ctx.req.headers.cookie : null;

    const allQuizzes = await fetch("http://localhost:3000/api/db/quiz/all", {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie },
    });

    quizData = allQuizzes.status === 200 ? await allQuizzes.json() : null;

    const user = await fetch("http://localhost:3000/api/db/user", {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie },
    });

    currentUser = user.status === 200 ? await user.json() : null;

    if (currentUser) {

      const userReportRes = await fetch(
        `http://localhost:3000/api/db/report/${currentUser.email}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", cookie },
        }
      );
      currentUserReport =
        userReportRes.status === 200 ? await userReportRes.json() : null;
    }
  } catch (err) {
    console.error("Error in quiz taking get initial props =>" + err);
    currentUser = null;
  }
  return { props: { quizData, currentUser, currentUserReport } };
};

export default quiztopic;
