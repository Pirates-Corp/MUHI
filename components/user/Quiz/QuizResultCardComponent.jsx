import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../../user/Quiz/QuizResultCardComponent.module.scss";
const QuizResultCard = ({ props }) => {
  // const syllabus = {};

  const router = useRouter();
  const [studentName, setStudentName] = useState("");

  // if (props.userReport != undefined) {
  //   props.userReport.report.map((report) => {
  //     if (props.quizData) {
  //       props.quizData.questions.map((question) => {
  //         if (question.id === report.id) {
  //           syllabus[question.chapter + " - " + question.section] =
  //             question.syllabus;
  //         }
  //       });
  //     }
  //   });
  // }

  useEffect(() => {
    let studentDataInCache = localStorage.getItem("Student")
    if ( studentDataInCache!== null) {
      let studentReport = JSON.parse(studentDataInCache)
      if(studentName === "") {
        studentReport.score = props.totalMarks
        fetch(`/api/db/auser/add`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentReport)
        });
      }
      setStudentName(studentReport.name);
    }
  }, []);

  const closeBtn = () => {
    localStorage.clear();

    if (router.pathname.startsWith("/quiz")) {
      router.push("/quiz");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {/* {props.syllabus ? ( */}
      <div id={style.conCard}>
        <div className={style.header}>
          <h1>Congratulations 🎉</h1>
        </div>

        <div id={style.msg}>
          {router.pathname.startsWith("/quiz") ? (
            <p>
              We have sent you the syllabus as a mail to{" "}
              <Link href="#">
                <a>{props.userId}</a>
              </Link>
            </p>
          ) : (
            <>
              <p> Thanks for taking this Quiz, {props.userId} </p>
              <p>
                To keep track your quiz prograss , Join Now by
                <a href="/signup"> Signing up</a>
              </p>
            </>
          )}
        </div>

        <div id={style.syllabus}>
          <h4>Syllabus List</h4>
          <div id={style.syllabusScroll}>
            <ul id={style.syllabusList}>
              {Object.keys(props.syllabus).map((key) => (
                <li>
                  <p>{key}</p>
                  <Link href={props.syllabus[key]}>
                    <a className="blueBtn">Open </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id={style.footer}>
          {props.totalMarks === "" ? (
            ""
          ) : (
            <div id={style.markHolder}>
              <p>Your Score</p>
              <h1 id={style.mark}>{props.totalMarks}</h1>
            </div>
          )}

          <div id={style.btnHolder}>
            <button className="redBtn" onClick={closeBtn}>
              Close
            </button>
          </div>
        </div>
      </div>
      {/* ) : (
        <p>Loading</p>
      )} */}
    </>
  );
};

export default QuizResultCard;
