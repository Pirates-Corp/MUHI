import Link from "next/link";
import { useState, useEffect } from "react";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizQuestionsForm.module.scss";
import { ExcelRenderer } from "react-excel-renderer";
import { useRouter } from "next/router"
;

let fileData;
let quizQuestions = [];


const QuizQuestionsForm = () => {
  const router = useRouter()
  let flag = true;
  let Quiz = {};
  const [loadedQuestions, updateLoadedQuestion] = useState([
    {
      id: 0,
      chapter: "",
      correctAnswer: '',
      options: [null],
      question: "",
      section: "",
      syllabus: "",
    },
  ]);

  try {
    Quiz = JSON.parse(sessionStorage.getItem("Quiz"));
  } catch (error) {}

  console.log("onStart", Quiz);

  const loadDoc = (e) => {
  

  
  if(!['xlsx','xlsm','xlsb','xltx'].includes(e.target.value.replace(/.*(\/|\\)/, "").split('.')[1]))
    {
      document
      .getElementById("file")
      .setAttribute("data", "Upload Questions");
      alert("Not an Excel File");
      return;
    }
    else
    {
      document
      .getElementById("file")
      .setAttribute("data", e.target.value.replace(/.*(\/|\\)/, ""));
    }
      

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

        loadedQuestions.map((obj)=>{

         if(!(obj.chapter === "" &&
          obj.correctAnswer === "" &&
          obj.options[0] === null &&
          obj.question === "" &&
          obj.section === "" &&
          obj.syllabus === "" && obj.id === 0))
          {
           obj.id = quizQuestions.length+1;
           quizQuestions.unshift(obj);
          }
        })

        Quiz = JSON.parse(sessionStorage.getItem("Quiz"));
        Quiz.questions = quizQuestions;
        sessionStorage.setItem("Quiz",JSON.stringify(Quiz))
        updateLoadedQuestion([...quizQuestions]);
        
        
      }
    });
  };

  const modifyQuiz = (e, obj) => {
    const {
      index,
      option,
      optionIndex,
      addOption,
      addQuestion,
      removeQuestion,
    } = obj;

    let value = e.target.type == "radio" ? option : e.target.value;
    let key = e.target.type == "radio" ? "correctAnswer" : e.target.name;

     if (loadedQuestions)
     {
        if (addOption === "add") 
        {
           loadedQuestions[index].options.push(null);
        } 
        else if (addOption === "remove") {
          if(!(loadedQuestions[index].options.length === 1))
          {
            if(loadedQuestions[index].correctAnswer === option)
            {
             loadedQuestions[index].correctAnswer = '';
            }
            loadedQuestions[index].options = loadedQuestions[index].options.filter(
             (e, index) => index !== optionIndex);
          }
       }
      else if (optionIndex !== undefined) 
      {
        if (loadedQuestions[index].correctAnswer === option) {
          loadedQuestions[index].correctAnswer = value;
        }
        loadedQuestions[index].options[optionIndex] = e.target.value;
      } 
      else if (removeQuestion)
      {
        loadedQuestions.splice(index, 1);
      } 
      else if (addQuestion)
      {
        loadedQuestions.push({
          id: index+1,
          chapter: "",
          correctAnswer: "",
          options: [null],
          question: "",
          section: "",
          syllabus: "",
        });
      } 
      else {
        console.log(obj);
        loadedQuestions[index][key] = value;
      }
    }
  
    Quiz = JSON.parse(sessionStorage.getItem("Quiz"));
    Quiz.questions = loadedQuestions;
    sessionStorage.setItem("Quiz",JSON.stringify(Quiz))
    updateLoadedQuestion([...loadedQuestions]);
   
  };

  const QuizDataFrom = async (e) => {
    e.preventDefault();
    let tempQuiz = Quiz;
    tempQuiz.totalMarks = tempQuiz.questions.length;
    tempQuiz.duration = tempQuiz.duration * 60;
    // console.log(JSON.stringify(tempQuiz));

    
    let res ;

    if(router.query.data)
    {
      console.log(tempQuiz._id);
      res = await fetch(`/api/db/quiz/${tempQuiz._id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify(tempQuiz)
      });
    }
    else{
      
      res = await fetch("/api/db/quiz/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempQuiz),
      });
      console.log(res);
    }

    if(201===res.status || 200===res.status)
    {
      sessionStorage.removeItem("Quiz");
      router.push('/admin/quiz');
    }
    else if(409===res.status)
    {
      alert("Duplicate Quiz Found")
      sessionStorage.setItem("Quiz", JSON.stringify(tempQuiz));
    }
    else
    {
      alert("Something went Wrong")
      sessionStorage.setItem("Quiz", JSON.stringify(tempQuiz));
    }

    


  };

  useEffect(() => {
    console.log("use effects call");
    
    Quiz = JSON.parse(sessionStorage.getItem("Quiz"));

    
    const sessionData = (Quiz)? Quiz.questions : undefined;
    if(sessionData !== undefined )
    {
      updateLoadedQuestion([...sessionData]);
      console.log(sessionData);
    }
  },[flag]);

  console.log(loadedQuestions);

    if(loadedQuestions.length==1 || loadedQuestions==null ){
        flag = false;
    } 


    const BackBtn=(e)=>{

        if(router.query.data)
        {
          router.push({
            pathname: '/admin/quiz/create-quiz',
            query: { data : "Edit"}
          })
        }
        else
        {
         
          router.push('/admin/quiz/create-quiz')
        }
    }
  

  return (
    <CenterLayout>
      <PrimaryHeading heading={(router.query.data)? "Edit Questions" : "Add Questions"}  />

      <div id={style.formBox}>
        <div id={style.fileForm}>
          <div className="fileUploader" id="file" data="Upload Questions">
            <img src="/imgs/svgs/File.svg" alt="" />
            <input type="file" onChange={(e) => loadDoc(e)} />
          </div>
        </div>

        <div className={style.reviewBox}>
          <h5>Review</h5>
          <div id="reviewForm">
            <div className={style.ScrollBox}>
              {loadedQuestions.length !== 0 ? (
                <>
                  {loadedQuestions.map((question, QIndex) => (
                    <div id={style.questionBox} key={QIndex}>

                      {/* <button
                        id={style.close}
                        className="redRoundBtn"
                        onClick={(e) =>
                          modifyQuiz(e, { index: QIndex, removeQuestion: true })
                        }
                      >
                        <img src="/imgs/svgs/CloseMenu.svg" alt="X" />
                      </button> */}

                      <div className={style.metaData}>
                        <h3>{"Q" + (QIndex + 1)}</h3>
                        <input
                          type="text"
                          name="chapter"
                          placeholder="chapter"
                          className="textBox"
                          key={"c" + question.chapter + QIndex}
                          defaultValue={question.chapter}
                          onBlur={(e) => modifyQuiz(e, { index: QIndex })}
                        />
                        <input
                          type="text"
                          name="section"
                          placeholder="section"
                          className="textBox"
                          key={"s" + question.section + QIndex}
                          defaultValue={question.section}
                          onBlur={(e) => modifyQuiz(e, { index: QIndex })}
                        />
                      </div>

                      <textarea
                        name="question"
                        placeholder="Type Question here"
                        className="textBox"
                        id={style.question}
                        key={question.id+"Q"}
                        defaultValue={question.question}
                        onBlur={(e) => modifyQuiz(e, { index: QIndex })}
                      ></textarea>

                      <div id={style.options}>
                        <div className={style.optionHeading}>
                          <p>Correct Answer</p>
                          <p>Options</p>
                        </div>

                        {question.options.map((option, index) => (
                          <div id={style.option}>
                            <label className="radio">
                              <input
                                type="radio"
                                name={"Q" + QIndex}
                                id="radioOption"
                                onChange={(e) =>
                                  modifyQuiz(e, { index: QIndex, option })
                                }
                                checked={
                                  option &&
                                  option.trim().toLowerCase() ===
                                    question.correctAnswer.trim().toLowerCase()
                                    ? true
                                    : false
                                }
                              />
                              <span className="inputControl"></span>
                            </label>
                            <input
                              type="text"
                              name="option"
                              placeholder="option"
                              className="textBox"
                              key={option + index}
                              defaultValue={option}
                              onBlur={(e) =>
                                modifyQuiz(e, {
                                  index: QIndex,
                                  optionIndex: index,
                                  option,
                                })
                              }
                            />
                            <button
                              className="redRoundBtn"
                              onClick={(e) =>
                                modifyQuiz(e, {
                                  index: QIndex,
                                  addOption: "remove",
                                  optionIndex: index,
                                  option,
                                })
                              }
                            >
                              {" "}
                              <img src="/imgs/svgs/OptionMinus.svg" alt="-" />
                            </button>
                            {index === question.options.length - 1 ? (
                              <button
                                className="greenRoundBtn"
                                onClick={(e) =>
                                  modifyQuiz(e, {
                                    index: QIndex,
                                    addOption: "add",
                                  })
                                }
                              >
                                {" "}
                                <img src="/imgs/svgs/OptionPlus.svg" alt="+" />
                              </button>
                            ) : (
                              " "
                            )}
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        name="syllabus"
                        placeholder="Add syllabus"
                        className="textBox"
                        defaultValue={question.syllabus}
                        className="textBox"
                        key={question.syllabus + QIndex}
                        onBlur={(e) => modifyQuiz(e, { index: QIndex })}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <p id={style.center}>No questions Added</p>
              )}
            </div>

            <div id={style.formFooter}>
              {/* <Link href="/admin/quiz/create-quiz">
                <a className="redBtn">
               
                  Back
                </a>
              </Link> */}
              <button className="redBtn" onClick={e=>BackBtn(e)}><img src="/imgs/svgs/Back.svg"></img>Back</button>
              
              {/* <button
                className="blueBtn"
                onClick={(e) =>
                  modifyQuiz(e, {
                    index: loadedQuestions.length,
                    addQuestion: true,
                  })
                }
              >
                <img src="/imgs/svgs/OptionPlus.svg"></img>
                Add Question
              </button> */}

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
