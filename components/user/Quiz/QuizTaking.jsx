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
    const triggerUseEffect = async () => {
      let quizInCache = localStorage.getItem("currentQuiz");
      // console.log(quizInCache);
      if (quizInCache === null) {
        // console.log('Cache is null');
        if (quizId) {
          // console.log('Quiz id is not null');
          const quizPromise = await fetch("/api/db/quiz/" + quizId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          const quizData = await quizPromise.json();
          console.log("Current Quiz => ", quizData.duration);
          console.log("Current Quiz => ", quizData);
          if (
            quizData &&
            JSON.stringify(quizData) !== JSON.stringify(currentQuiz)
          ) {
            console.log("Quiz data and current state is not null");
            let userReport = {};
            const reportPromise = await fetch(
              "/api/db/report/" + currentUser._id + "/reports/" + quizData._id
            );
            if (reportPromise.status === 404) {
              userReport = {
                id: quizData._id,
                rank: 0,
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
                report: [],
              };
              console.log("new report => ", userReport);
              const newReportPromise = await fetch(
                "/api/db/report/" + currentUser._id + "/reports/add",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userReport),
                }
              );
              if (newReportPromise.status === 200) {
                console.log(
                  "new reports created and pushed into db => ",
                  report
                );
                userReport = await newReportPromise.json();
              }
            } else if (reportPromise.status === 200) {
              userReport = await reportPromise.json();
            }
            console.log("userReport => ", userReport);
            if(userReport.status === 1 ) {
              localStorage.removeItem('currentQuiz')
              router.push("/quiz")
            }
            userReport.report.map((attendedQuestion) => {
              quizData.questions.map((question) => {
                if (question.id == attendedQuestion.id) {
                  question.answer = attendedQuestion.answer;
                }
              });
            });

            quizData.duration = quizData.duration - userReport.time.taken

            setCurrentQuiz(quizData);
            localStorage.setItem("currentQuiz", JSON.stringify(quizData));
          }
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
    };
    triggerUseEffect();
    handleRadioSelect();
  }, [currentQuiz, quizId]);

  const handleRadioSelect = (e = undefined, option = undefined) => {
    if (currentQuiz && currentQuiz.questions) {
      const report = {}
      if (option!=undefined) {
        currentQuiz.questions[questionId].answer = option;
      }

      if(currentQuiz.status === 1) {
        console.log("Quiz status updated to completed");
        report.status = 1
      }
      
      report.chapter = currentQuiz.questions[questionId].chapter
      report.section = currentQuiz.questions[questionId].section
      report.answer = currentQuiz.questions[questionId].answer ? currentQuiz.questions[questionId].answer : ""
      report.duration = currentQuiz.totalDuration - currentQuiz.duration
      
      
      fetch(
        "/api/db/report/" +
          currentUser._id +
          "/reports/" +
          currentQuiz._id +
          "/report/" +
          (questionId + 1) +
          "/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(report),
        }
      ).then((res) => {
        if(res.status == 200) {
          console.log("DB Updated");
        }
      });
      if(option!=undefined) {
        setCurrentQuiz({ ...currentQuiz });
        console.log(currentQuiz);
      }
    }
  };

  const endQuiz = () => {
    handleRadioSelect()
    localStorage.removeItem('currentQuiz')
    setCurrentQuiz({...currentUser})
    setTimeout(()=>{
      router.push({
        pathname: '/quiz/congratulations',
        query: { quizId:currentQuiz._id,userId:currentUser._id}
      })
    },1000)
  }

  const handleEndQuiz = (e) => {
    currentQuiz.status = 1
    endQuiz()
  }


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
                endQuiz
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

                <Link
                 href={{
                  pathname: "congratulations/",
                  query: {
                    quizId: currentQuiz._id,
                    userId: currentUser._id
                  },
                }}>
                  <a id={style.exitBtn} className="redBtn">
                    {questionId === currentQuiz.questions.length - 1
                      ? "Finish"
                      : "End Quiz"}
                  </a>
                </Link>

                <button id={style.exitBtn} className="redBtn" onClick={e=> {handleEndQuiz(e)}}>
                    {questionId === currentQuiz.questions.length - 1
                      ? "Finish"
                      : "End Quiz"}
                  </button>
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
