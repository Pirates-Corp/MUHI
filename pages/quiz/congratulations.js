import QuizResultCard from "../../components/user/Quiz/QuizResultCardComponent";
import CenterLayout from "../../components/Layouts/CenterLayout.jsx";
export default function quiztopic({ props }) {

  const syllabus = {};

  if (props.userReport != undefined) {
    props.userReport.report.map((report) => {
      if (props.quizData) {
        props.quizData.questions.map((question) => {
          if (question.id === report.id) {
            syllabus[question.chapter + " - " + question.section] =
              question.syllabus;
          }
        });
      }
    });
  }

  const totalMarks = quizData.quizTag.split("-")[1].toLowerCase().trim() === "true" ? totalMark=props.userReport.score.taken +"/" +props.userReport.score.total : "";

  return (
    <CenterLayout>
      <QuizResultCard props={{syllabus,totalMarks,userId = props.userId}} />
    </CenterLayout>
  );
}

quiztopic.getInitialProps = async (ctx) => {
  let userReport, quizData;
  const cookie = ctx.req ? ctx.req.headers.cookie : null;
  try {
    const report = await fetch(
      "http://localhost:3000/api/db/report/" +
        ctx.query.userId +
        "/reports/" +
        ctx.query.quizId,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", cookie },
      }
    );

    const quiz = await fetch(
      "http://localhost:3000/api/db/quiz/" + ctx.query.quizId,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", cookie },
      }
    );
    userReport = await report.json();
    userReport = userReport ? userReport : null;
    quizData = await quiz.json();
    quizData = quizData ? quizData : null;
  } catch (err) {
    console.error(err);
  }

  return { props: { userReport, quizData, userId: ctx.query.userId } };
};
