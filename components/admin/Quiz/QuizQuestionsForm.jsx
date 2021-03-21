import Link from "next/link";
import { useState, useEffect } from "react";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizQuestionsForm.module.scss";
import { ExcelRenderer } from "react-excel-renderer";

let fileData;
let quizQuestions = [];

const QuizQuestionsForm = () => {
  const Quiz = {};
  const [loadedQuestions, updateLoadedQuestion] = useState([]);

  try {
    Quiz.data = JSON.parse(sessionStorage.getItem("Quiz"));
  } catch (error) {}

  console.log("onStart", Quiz);

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
          quizQuestions.push(data);
        });
        console.log(quizQuestions);
        updateLoadedQuestion(quizQuestions);
      }
    });
  };

  const modifyQuiz = (e, index) => {
    let value = e.target.value;
    let key = e.target.name;
    console.log(quizQuestions);

    if (quizQuestions) {
      quizQuestions[index][key] = value;
    }

    updateLoadedQuestion(quizQuestions);
  };

  const QuizDataFrom = async (e) => {
    e.preventDefault();
    let tempQuiz = Quiz;
    tempQuiz.data.questions = quizQuestions;
    tempQuiz.data.totalMarks = quizQuestions.length;
    sessionStorage.setItem("Quiz", JSON.stringify(tempQuiz.data));

    console.log(tempQuiz);
    let res = await fetch("/api/db/quiz/add", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Quiz.data),
    });
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
        
                     <label className="radio">
                        <input type="radio" name="type1" id="radioOption" defaultChecked/>
                        <span className="inputControl"></span>
                      </label>
                      <label className="radio">
                        <input type="radio" name="type1" id="radioOption"   />
                        <span className="inputControl"></span>
                      </label>

        <div className={style.reviewBox}>
          <h5>Review</h5>
          <div id="reviewForm">
            <div className={style.ScrollBox}>
              
              {loadedQuestions.length !== 0 ? (
                <>
                
                  {loadedQuestions.map((question, index) => (
                    <div id={style.questionBox}>
                     <label className="radio">
                        <input type="radio" name="type3" id="radioOption" defaultChecked/>
                        <span className="inputControl"></span>
                      </label>
                      <label className="radio">
                        <input type="radio" name="type3" id="radioOption"   />
                        <span className="inputControl"></span>
                      </label>
                      <button id={style.close} className="redRoundBtn">
                        <img src="/imgs/svgs/CloseMenu.svg" alt="X" />
                      </button>

                      <div className={style.metaData}>
                        <h3>{"Q" + (index + 1)}</h3>
                        <input
                          type="text"
                          name="chapter"
                          placeholder="chapter"
                          className="textBox"
                          defaultValue={question.chapter}
                          onBlur={(e) => modifyQuiz(e, index)}
                        />
                        <input
                          type="text"
                          name="section"
                          placeholder="section"
                          className="textBox"
                          defaultValue={question.section}
                          onBlur={(e) => modifyQuiz(e, index)}
                        />
                      </div>
                      
                      <textarea
                        name="question"
                        placeholder="Type Question here"
                        className="textBox"
                        id={style.question}
                        defaultValue={question.question}
                        onBlur={(e) => modifyQuiz(e, index)}
                      ></textarea>


    


                      <div id={style.options}>
                        <div className={style.optionHeading}>
                          <p>Correct Answer</p>
                          <p>Options</p>
                        </div>
                       
                        {question.options.map((option,index) => (                            
                           <div id={style.option}>
                              <label className="radio">
                              {/* onLoad={e=>{(option === question.correctAnswer)? document.getElementById('radioOption').checked = true : " "}}  */}
                                <input type="radio" name="type" id="radioOption" />
                                <span className="inputControl"></span>
                              </label>
                              <input
                                type="text"
                                name="option"
                                placeholder="option"
                                className="textBox"
                                defaultValue={option}
                              />
                              <button className="redRoundBtn">
                                {" "}
                                <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                              </button>
                              {(index===question.options.length-1) ?
                                (<button className="greenRoundBtn">
                                  {" "}
                                  <img src="/imgs/svgs/OptionPlus.svg" alt="+" />
                                </button>)
                                :" "
                              }
                              
                            </div>
                        ))}

                      </div>

                      <input
                        type="text"
                        name="syllabus"
                        placeholder="Add syllabus"
                        className="textBox"
                        defaultValue={question.syllabus}
                        onBlur={(e) => modifyQuiz(e, index)}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <p>No questions Upload</p>
              )}
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
          </div>
        </div>
      </div>
    </CenterLayout>
  );
};

export default QuizQuestionsForm;
