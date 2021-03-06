import Link from "next/link";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizQuestionsForm.module.scss";

const QuizQuestionsForm = () => {


  const loadDoc = (e)=>{
    document
      .getElementById("file")
      .setAttribute(
        "data",
        e.target.value.replace(/.*(\/|\\)/, "")
      );


      // handel the excel file


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
                onChange={(e) => loadDoc(e)}
              />
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

              <button className="greenBtn" id={style.save} type="submit">
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
