import PrimaryHeading from "../../common/Header/PrimaryHeading";
import Link from "next/link";
import style from "../../user/Quiz/QuizTaking.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Timer from './Timer'

function QuizTaking() {
  let router = useRouter();
  let quizId = router.query.quiz;
  let questionId = router.query.questionId
    ? Number(router.query.questionId)
    : -1;

  const [currentQuiz, setCurrentQuiz] = useState({});

  useEffect(() => {
    let quizInCache = localStorage.getItem("currentQuiz");
    // console.log(quizInCache);
    if (quizInCache === null) {
      // console.log('Cache is null');
      if (quizId) {
        // console.log('Quiz id is not null');
        fetch("http://localhost/api/db/quiz/" + quizId, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            res.json().then((quizData) => {
              if (
                quizData &&
                JSON.stringify(quizData) !== JSON.stringify(currentQuiz)
              ) {
                console.log("Quiz data and current state is not null");
                quizData.duration = quizData.duration * 60
                setCurrentQuiz(quizData);
                localStorage.setItem("currentQuiz", JSON.stringify(quizData));
              }
            });
          })
          .catch((err) => console.error(err));
      } else console.log("failed loading quiz id in address bar");
    } else {
      // console.log('Not null==============');
      if (!currentQuiz.hasOwnProperty("questions")) {
        // console.log('does not has own poperty==============');
        setCurrentQuiz(JSON.parse(quizInCache));
      } else {
        if (currentQuiz.title === quizId) {
          // console.log('same title==============');
          localStorage.setItem("currentQuiz", JSON.stringify(currentQuiz));
        } else if (quizId) {
          // console.log("title => "+currentQuiz.title+"  id=>"+quizId);
          // console.log("id removed for some reason");
          localStorage.removeItem("currentQuiz");
          setCurrentQuiz({});
        }
      }
    }
  }, [currentQuiz, quizId]);
  

  const handleRadioSelect = (e, option) => {
    currentQuiz.questions[questionId].answer = option;
    setCurrentQuiz({ ...currentQuiz });
    console.log(currentQuiz);
  };

  return (
    <>
      <div id={style.takeQuizBox}>
        <PrimaryHeading heading={currentQuiz.title} />
        {questionId >= 0 &&
        currentQuiz &&
        currentQuiz.hasOwnProperty("questions") &&
        questionId < currentQuiz.questions.length ? (
          <>
            <Timer props={{duration:currentQuiz.duration,currentQuiz,setCurrentQuiz}}/>
            <div id={style.quiz}>
              <div id={style.questionBox}>
                <div id={style.questionHolder}>
                  <p id={style.question}>
                    {currentQuiz.questions[questionId].question}
                  </p>
                  <div id={style.options}>
                    {currentQuiz.questions[questionId].options.map(
                      (option, index) => (
                        <label className="radio" id={style.radio}>
                          <input
                            type="radio"
                            name={"option"}
                            onChange={(e) => handleRadioSelect(e, option)}
                            checked={
                              currentQuiz.questions[questionId].answer ===
                              option
                            }
                          />
                          <span
                            className="inputControl"
                            id={style.inputControl}
                          ></span>
                          {option}
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div id={style.navOptions}>
                  {questionId > 0 ? (
                    <Link
                      className="blueBtn"
                      id={style.pre}
                      href={{
                        pathname: "/quiz/" + quizId,
                        query: {
                          questionId: questionId - 1,
                        },
                      }}
                    >
                      <a className="blueBtn" id={style.pre}>
                        Previous
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}

                  {questionId >= 0 &&
                  questionId < currentQuiz.questions.length - 1 ? (
                    <Link
                      href={{
                        pathname: "/quiz/" + quizId,
                        query: {
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
                          pathname: "/quiz/" + quizId,
                          query: {
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
                                  : question.hasOwnProperty("answer")
                                  ? style.answered
                                  : ""
                              }`}
                            >
                              {question.id}
                            </button>
                          </li>
                        </a>
                      </Link>
                    ))}
                  </ul>
                </div>

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
}

export default QuizTaking;
