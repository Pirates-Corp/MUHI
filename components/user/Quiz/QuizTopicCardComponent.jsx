import Link from "next/link";
import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from "../../user/Quiz/QuizTopicCardComponent.module.scss";

const QuizTopicCardComponent = ({ props }) => {
  let data = props;

  const trimISOString = (s) => {
    // return s.substring(0,s.indexOf('.')-3).replace("T"," ");
    return s.substring(0, s.indexOf("T"));
  };

  return (
    <>
      <PrimaryHeader heading="MUHI Quiz" />

      <div id={style.quizCardsHolder}>
        {data.map((quiz) => (
          <div className={style.quizCard}>
            <h2>{quiz.title}</h2>
            <ul>
              <li>
                <img src="imgs/svgs/TimeW.svg" alt="" />
                <p>{`${quiz.duration} Mins`}</p>
              </li>
              <li>
                <img src="imgs/svgs/FileW.svg" alt="" />
                <p>{`${quiz.questions.length} Questions`}</p>
              </li>
              <li>
                <img src="imgs/svgs/EndDateW.svg" alt="" />
                <p>
                  End Date :{" "}
                  {trimISOString(
                    new Date(quiz.schedule.endTime + 19800000).toISOString()
                  )}
                </p>
              </li>
            </ul>
            <div id={style.quizBtnHolder}>
              <Link href="quiz/takequiz">
                <a className={style.quizBtn}>Take Quiz</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuizTopicCardComponent;
