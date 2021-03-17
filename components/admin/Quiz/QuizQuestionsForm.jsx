import Link from "next/link";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizQuestionsForm.module.scss";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

let fileData;
let quizQuestion = [];

const QuizQuestionsForm = () => {
  const loadDoc = (e) => {
    document
      .getElementById("file")
      .setAttribute("data", e.target.value.replace(/.*(\/|\\)/, ""));

    let fileObj = e.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        fileData = resp.rows.slice(1);
        fileData.map((questions) => {
          let data = {
            id: questions[0],
            question: questions[1],
            options: questions.slice(2, questions.length - 4),
            correctAnswer: questions[questions.length - 4],
            chapter: questions[questions.length - 3],
            section: questions[questions.length - 2],
            syllabus: questions[questions.length - 1],
          };
          quizQuestion.push(data);
        });
      }
    });
  };

  const QuizDataFrom =  async(e) => {
  let  quiz = {
      title: "otha poi thola 1",
      quizTag: "Fek Tag",
      state: "active",
      schedule: {
        startTime: 1614419276373,
        endTime: 1614419276373,
      },
      totalMarks: 15,
      questions: quizQuestion,
    };

    console.log(JSON.stringify(quiz));

    let res =  await fetch('/api/db/quiz/add',{
       method : 'PUT',
       headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(quiz)
       })

       console.log(res);

  };

  return (
    <CenterLayout>
      <PrimaryHeading heading="Add Questions" />

      <div id={style.formBox}>
        <div id={style.fileForm}>
          <div className="fileUploader" id="file" data="Upload Questions">
            <img src="/imgs/svgs/File.svg" alt="" />
            <input type="file" onChange={(e) => loadDoc(e)} />
          </div>
        </div>

        <div className={style.reviewBox}>
          <h5>Review</h5>
          <form id="reviewForm">
            <div className={style.ScrollBox}>
              <div id={style.questionBox}>
                <button id={style.close} className="redRoundBtn">
                  <img src="/imgs/svgs/CloseMenu.svg" alt="X" />
                </button>

                <div className={style.metaData}>
                  <h3>Q1</h3>
                  <input
                    type="text"
                    name="chapter"
                    placeholder="chapter"
                    className="textBox"
                  />
                  <input
                    type="text"
                    name="section"
                    placeholder="section"
                    className="textBox"
                  />
                </div>

                <textarea
                  name="question"
                  placeholder="Type Question here"
                  className="textBox"
                  id={style.question}
                ></textarea>

                <div id={style.options}>
                  <div className={style.optionHeading}>
                    <p>Correct Answer</p>
                    <p>Options</p>
                  </div>

                  <div id={style.option}>
                    <label className="radio">
                      <input type="radio" name="type" />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      name="option"
                      placeholder="option"
                      className="textBox"
                    />
                    <button className="redRoundBtn">
                      {" "}
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                  </div>

                  <div id={style.option}>
                    <label className="radio">
                      <input type="radio" name="type" />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      name="option"
                      placeholder="option"
                      className="textBox"
                    />
                    <button className="redRoundBtn">
                      {" "}
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                    <button className="greenRoundBtn">
                      {" "}
                      <img src="/imgs/svgs/OptionPlus.svg" alt="+" />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  name="syllabus"
                  placeholder="Add syllabus"
                  className="textBox"
                />
              </div>

              <div id={style.questionBox}>
                <button id={style.close} className="redRoundBtn">
                  <img src="/imgs/svgs/CloseMenu.svg" alt="X" />
                </button>

                <div className={style.metaData}>
                  <h3>Q2</h3>
                  <input
                    type="text"
                    name="chapter"
                    placeholder="chapter"
                    className="textBox"
                  />
                  <input
                    type="text"
                    name="section"
                    placeholder="section"
                    className="textBox"
                  />
                </div>

                <textarea
                  name="question"
                  placeholder="Type Question here"
                  className="textBox"
                  id={style.question}
                ></textarea>

                <div id={style.options}>
                  <div className={style.optionHeading}>
                    <p>Correct Answer</p>
                    <p>Options</p>
                  </div>

                  <div id={style.option}>
                    <label className="radio">
                      <input type="radio" name="type" />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      name="option"
                      placeholder="option"
                      className="textBox"
                    />
                    <button className="redRoundBtn">
                      {" "}
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                  </div>

                  <div id={style.option}>
                    <label className="radio">
                      <input type="radio" name="type" />
                      <span className="inputControl"></span>
                    </label>
                    <input
                      type="text"
                      name="option"
                      placeholder="option"
                      className="textBox"
                    />
                    <button className="redRoundBtn">
                      {" "}
                      <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                    </button>
                    <button className="greenRoundBtn">
                      {" "}
                      <img src="/imgs/svgs/OptionPlus.svg" alt="+" />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  name="syllabus"
                  placeholder="Add syllabus"
                  className="textBox"
                />
              </div>
            </div>

            <div id={style.formFooter}>
              <Link href="/admin/quiz/create-quiz">
                <a className="redBtn">
                  <img src="/imgs/svgs/Back.svg"></img>
                  Back
                </a>
              </Link>

              <button className="blueBtn">
                <img src="/imgs/svgs/OptionPlus.svg"></img>
                Add Question
              </button>

              <button
                className="greenBtn"
                id={style.save}
                onClick={(e) => {
                  QuizDataFrom(e);
                }}
                type="submit"
              >
                <img src="/imgs/svgs/tick.svg"></img>
                Save & Finish
              </button>
            </div>
          </form>
        </div>
      </div>
    </CenterLayout>
  );
};

export default QuizQuestionsForm;
