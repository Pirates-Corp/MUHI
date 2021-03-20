import Link from "next/link";
import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from "../../user/Quiz/QuizTopicCardComponent.module.scss";


const QuizTopicCardComponent = ({props}) => {
  const quizArray = props ?  props : []
  const offsetInMillis = new Date().getTimezoneOffset() * 60000; 

  const getISOString = (timeInMillis) => {
    let isoString = new Date(timeInMillis + offsetInMillis).toISOString();
    // return s.substring(0,s.indexOf('.')-3).replace("T"," ");
    return isoString.substring(0, isoString.indexOf("T"));
  };

  return (
    <>
      <PrimaryHeader heading="MUHI Quiz" />

      <div id={style.quizCardsHolder}>
        {quizArray.map((quiz) => (
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
                <p>End Date : {getISOString(quiz.schedule.endTime)}</p>
              </li>
            </ul>
            <div id={style.quizBtnHolder}>
              <Link
                href={{
                  pathname: "quiz/" + quiz.title,
                }}
                asPath="/take"
              >
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
