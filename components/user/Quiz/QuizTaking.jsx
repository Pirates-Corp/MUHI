import PrimaryHeading from "../../common/Header/PrimaryHeading";
import Link from "next/link";
import style from "../../user/Quiz/QuizTaking.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Timer from "./Timer";

function QuizTaking({ props }) {
  const currentUser = props.currentUser;
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
        fetch("/api/db/quiz/" + quizId, {
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
                fetch(
                  "/api/db/report/" +
                    currentUser._id +
                    "/reports/" +
                    quizData._id
                ).then((report) => {
                  let userReport;
                  if (report.status === 404) {
                    userReport = {
                      id: quizData._id,
                      rank: 1,
                      status: 0,
                      questionsAttended: [],
                      time: {
                        taken: 0,
                        total: quizData.duration,
                      },
                      score: {
                        taken: 0,
                        total: quizData.questions.length,
                      },
                      report: []
                    };
                    console.log("new report => ", userReport);
                    fetch(
                      "/api/db/report/" + currentUser._id + "/reports/add",
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userReport),
                      }
                    ).then((report) => {
                      if(report.status === 200){
                        console.log(report);
                        /**
                         *  to do Need to set d reports in local storage and need to handle push
                         */
                      }
                    });
                  } else if (report.status === 200) {
                    report.json().then((currentReport) => {
                      userReport = currentReport
                      console.log("userReport => " + userReport);
                    });
                  }
                });
                setCurrentQuiz(quizData);
                localStorage.setItem("currentQuiz", JSON.stringify(quizData));
              }
            });
          })
          .catch((err) =>
            console.error("error in quiz taking useeffect" + err)
          );
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
            <Timer
              props={{
                currentQuiz,
                setCurrentQuiz,
              }}
            />
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
          "Loading quiz..."
        )}
      </div>
    </>
  );
}

export default QuizTaking;
