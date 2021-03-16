import React, { useState } from 'react';
import { ExcelRenderer } from "react-excel-renderer";
import Link from "next/link";

import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import QuizQuestionForm from "./QuizQuestionForm";
import style from "./QuizQuestionsForm.module.scss";


const QuizQuestionsFormPage = () => {
  const [importedQuestions, setImportedQuestions] = useState([]);
  const [file, setFile] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionsToBeSubmit, setQuestionsToBeSubmit] = useState([]);
  const [data, setData]=useState({})
  let totalQuestions = [];


  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFile(file)
        ExcelRenderer(file, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                let data = []
                let rows = resp.rows.slice(1);
                rows.forEach(row => {
                    if (row[0]) {
                        data.push({
                            qNo: `${row[0]}`,
                            question: `${row[1]}`,
                            firstOption: `${row[2]}`,
                            secondOption: `${row[3]}`,
                            thirdOption: `${row[4]}`,
                            fourthOption: `${row[5]}`,
                            correctAnswer: `${row[6]}`,
                            chapter: `${row[7]}`,
                            section: `${row[8]}`,
                            syllabus: `${row[9]}`
                        })
                    }
                })
                setImportedQuestions(data);
            }
        });
    }
  }

  const handleAddMoreQuestion = (e) => {
    setQuestionNumber(questionNumber + 1)

    let getCorrect = data.correctAnswer;
    if(getCorrect){
      //sets the actuall correct answer instead option names
      let getActuallCorrect = data[`${getCorrect}`];
      data.correctAnswer = getActuallCorrect
    }

    questionsToBeSubmit.push(data);
    setData({})
  }

  const handleInputChange = (e) =>{
    let val = e.target.value;
    let id = e.target.id;
    data.qNo = questionNumber;
    setData({ ...data, [id]: val });
    console.log("data", data)
  }

  const handleRemoveQuestion = (id) => {
    console.log("id", id)
    totalQuestions.splice((id-1), 1);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
  }

  return (
    <CenterLayout>
      <PrimaryHeading heading="Add Questions" />
        <div id={style.formBox}>
          <div id={style.fileForm}>
              <div
                className="fileUploader"
                id="file"
                data="Upload Questions"
              >
                <img src="/imgs/svgs/File.svg" alt="" />
                <input
                  type="file"
                  onChange={handleUpload}
                />
              </div>
          </div>

            <form id="reviewForm" method="POST" onSubmit={handleSubmitForm}>
              <div className={style.reviewBox}>
                <h5>Review</h5>
                <div className={style.ScrollBox}>
                  <div id={style.questionBox}>
                    

                  {importedQuestions && importedQuestions.map(question => 
                      <QuizQuestionForm 
                        qNo={question.qNo}
                        question={question.question}
                        chapter={question.chapter}
                        section={question.section}
                        syllabus={question.syllabus}
                        correctAnswer={question.correctAnswer}
                        firstOption={question.firstOption}
                        secondOption={question.secondOption}
                        thirdOption={question.thirdOption}
                        fourthOption={question.fourthOption}
                        handleChange={handleInputChange}
                      />
                    )}

                  {questionsToBeSubmit.map((index,question) => 
                      <QuizQuestionForm 
                        qNo={question.qNo}
                        
                        chapter={question.chapter}
                        section={question.section}
                        syllabus={question.syllabus}
                        correctAnswer={question.correctAnswer}
                        firstOption={question.firstOption}
                        secondOption={question.secondOption}
                        thirdOption={question.thirdOption}
                        fourthOption={question.fourthOption}
                        handleChange={handleInputChange}
                      />
                    )}

                    <QuizQuestionForm qNo={questionNumber} handleChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div id={style.formFooter}>
                  <Link href="/admin/quiz/create-quiz">
                    <a className="redBtn">
                      <img src="/imgs/svgs/Back.svg"></img>
                      Back
                    </a>
                  </Link>
                  <button className="blueBtn" type="submit" onClick={handleAddMoreQuestion}>
                    <img src="/imgs/svgs/OptionPlus.svg"></img>
                    Add Question
                  </button>

                  <button className="greenBtn" id={style.save} type="submit">
                    <img src="/imgs/svgs/tick.svg"></img>
                    Save & Finish
                  </button>

              </div>
          </form>
      </div>
    </CenterLayout>
  );
};

export default QuizQuestionsFormPage;