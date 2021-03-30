import QuizResultCard from "../../components/user/Quiz/QuizResultCardComponent";
import CenterLayout from "../../components/Layouts/CenterLayout.jsx";
export default function quiztopic({props}) {
  return (
    <CenterLayout>
      <QuizResultCard props={props} />
    </CenterLayout>
  );
}

quiztopic.getInitialProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : null;

  const report = await fetch("http://localhost:3000/api/db/report/"+ctx.query.userId+"/reports/"+ctx.query.quizId, {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  const quiz = await fetch("http://localhost:3000/api/db/quiz/"+ctx.query.quizId, {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  let userReport,quizData;
  try {
    userReport = await report.json();
    userReport = userReport ? userReport : null;
    quizData = await quiz.json();
    quizData = quizData ? quizData : null;
  } catch (err) {
    console.error(err);
  }

  return { props: { userReport,quizData,userId:ctx.query.userId } };
};
