import PrimaryHeading from "../../common/Header/PrimaryHeading";
import Link from "next/link";
import style from "../../user/Quiz/QuizTaking.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const QuizTaking = () => {
  let router = useRouter();
  let quizId = router.query.quizId ? Number(router.query.quizId) : -1;
  let questionId = router.query.questionId
    ? Number(router.query.questionId)
    : -1;

  const [currentQuiz, setCurrentQuiz] = useState([]);

  useEffect(() => {
    let quizArray = sessionStorage.getItem("quizArray");
    if (quizArray && quizArray !== "undefined") {
      quizArray = JSON.parse(quizArray);
      if (
        quizId >= 0 &&
        quizArray[quizId] &&
        JSON.stringify(quizArray[quizId]).toLocaleLowerCase() !==
          JSON.stringify(currentQuiz).toLocaleLowerCase()
      ) {
        setCurrentQuiz(quizArray[quizId]);
      }
    }
  });

  return (
    <>
      <div id={style.takeQuizBox}>
        <PrimaryHeading heading={currentQuiz.title} />
        {questionId >= 0 &&
        currentQuiz &&
        currentQuiz.hasOwnProperty("questions") &&
        questionId < currentQuiz.questions.length ? (
          <>
            <div id={style.timer}>
              <img src="/imgs/svgs/TimeTaken.svg" alt="Time :" />
              <p id={style.time}>
                <span>01</span>: <span>30</span>
              </p>
            </div>
            <div id={style.quiz}>
              <div id={style.questionBox}>
                <div id={style.questionHolder}>
                  <p id={style.question}>
                    {currentQuiz.questions[questionId].question}
                  </p>
                  <div id={style.options}>
                    {currentQuiz.questions[questionId].options.map((option) => (
                      <label className="radio" id={style.radio}>
                        <input type="radio" name="option" />
                        <span
                          className="inputControl"
                          id={style.inputControl}
                        ></span>
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div id={style.navOptions}>
                  {questionId > 0 ? (
                    // <button className="blueBtn" id={style.pre}>
                    <Link
                      className="blueBtn"
                      id={style.pre}
                      href={{
                        pathname: "/quiz/attend",
                        query: {
                          quizId,
                          questionId: questionId - 1,
                        },
                      }}
                    >
                      <a className="blueBtn" id={style.pre}>
                        Previous
                      </a>
                    </Link>
                  ) : (
                    // </button>
                    ""
                  )}

                  {questionId >= 0 &&
                  questionId < currentQuiz.questions.length - 1 ? (
                    <Link
                      href={{
                        pathname: "/quiz/attend",
                        query: {
                          quizId,
                          questionId: questionId + 1,
                        },
                      }}
                    >
                      <a className="blueBtn" id={style.nxt}>
                        Next
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div id={style.questionSet}>
                <div className={style.scrollView}>
                  <ul id={style.roundList}>
                    {currentQuiz.questions.map((question) => (
                      <Link
                        href={{
                          pathname: "/quiz/attend",
                          query: {
                            quizId: quizId,
                            questionId: question.id - 1,
                          },
                        }}
                      >
                        <a className={style.quizBtn}>
                          <li>
                            <button
                              className={`${style.qNav} ${
                                questionId + 1 === question.id
                                  ? style.active
                                  : ""
                              }`}
                            >
                              {question.id}
                            </button>
                          </li>
                        </a>
                      </Link>
                    ))}

                    <li>
                      <button className={`${style.qNav} ${style.answered}`}>
                        2
                      </button>
                    </li>
                  </ul>
                </div>

                {/* <button id={style.exitBtn} className="redBtn">
               End Quiz
              </button> */}

                <Link href="congratulations">
                  <a id={style.exitBtn} className="redBtn">
                    {questionId === currentQuiz.questions.length - 1
                      ? "Finish"
                      : "End Quiz"}
                  </a>
                </Link>
              </div>
            </div>
          </>
        ) : (
          "Invalid Question Id"
        )}
      </div>
    </>
  );
};

export default QuizTaking;
