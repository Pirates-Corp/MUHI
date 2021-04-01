import Link from "next/link";
import style from "../../user/Quiz/QuizResultCardComponent.module.scss";
const QuizResultCard = ({ props }) => {
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

  return (
    <>
      <div id={style.conCard}>
        <div className={style.header}>
          <h1>Congratulations 🎉</h1>
        </div>

        <div id={style.msg}>
          <p>
            We have sent you the syllabus as a mail to{" "}
            <Link href="#">
              <a>{props.userId}</a>
            </Link>
          </p>
        </div>

        <div id={style.syllabus}>
          <h4>Syllabus List</h4>
          <div id={style.syllabusScroll}>
            <ul id={style.syllabusList}>
              {Object.keys(syllabus).map((key) => (
                <li>
                  <p>{key}</p>
                  <Link href={syllabus[key]}>
                    <a className="blueBtn">Open </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id={style.footer}>
         
          {props.quizData.quizTag.split("-")[1].toLowerCase().trim() ===
          "true" ? (
            <div id={style.markHolder}>
              <p>Your Score</p>
              <h1 id={style.mark}>
                {props.userReport.score.taken +
                  "/" +
                  props.userReport.score.total}
              </h1>
            </div>
          ) : (
            ""
          )}

          <div id={style.btnHolder}>
            <Link href="/">
              <a className="redBtn">Close</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultCard;
