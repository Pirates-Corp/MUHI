import Link from "next/link";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizDataForm.module.scss";
const QuizDataForm = () => {
  const currentTime =
    new Date().toISOString().split(":")[0] +
    ":" +
    new Date().toISOString().split(":")[1];

  return (
    <CenterLayout>
      <PrimaryHeading heading="Create Quiz" />
      <div id={style.formBox}>
        <form >
          <div id={style.dataForm}>
            <div className={style.left}>
              <div className="TextBox">
                <img src="/imgs/svgs/QuizName.svg" alt="username" />
                <input
                  type="text"
                  id="quizName"
                  name="quizName"
                  placeholder="Quiz Name"
                  required
                />
              </div>
              <div className="TextBox">
                <img src="/imgs/svgs/TimeTaken.svg" alt="time" />
                <input
                  type="text"
                  id="quizTime"
                  name="quizTime"
                  placeholder="Duration In mins"
                  required
                />
              </div>
            </div>
            <div className={style.right}>
              <div className="TextBox">
                <img src="/imgs/svgs/StartDate.svg" alt="date" />
                <input
                  type="datetime-local"
                  min={currentTime}
                  id="startDate"
                  name="startDate"
                  onChange={(e) => {
                    document.getElementById("endDate").min = e.target.value;
                    document
                      .getElementById("endDate")
                      .removeAttribute("disabled");
                  }}
                  placeholder="Start Date"
                  required
                />
              </div>

              <div className="TextBox">
                <img src="/imgs/svgs/endDate.svg" alt="date" />
                <input
                  disabled
                  type="datetime-local"
                  min={currentTime}
                  onChange={(e) => {
                    document.getElementById("startDate").max = e.target.value;
                  }}
                  id="endDate"
                  name="endDate"
                  placeholder="end Date"
                  required
                />
              </div>

              <label id={style.radio} className="radio">
                <input type="radio" name="type" checked />
                <span className="inputControl"></span>
                Open
              </label>
              <label id={style.radio} className="radio">
                <input type="radio" name="type" checked />
                <span className="inputControl"></span>
                Close
              </label>
            </div>
          </div>

          <div className={style.buttonHolder}>
            <Link href="/admin/quiz">
              <a className="redBtn">Exit</a>
            </Link>
            <input
              type="submit"
              className="blueBtn"
              name="Add Questions"
              value="Add Questions"
            />
          </div>
        </form>
      </div>
    </CenterLayout>
  );
};

export default QuizDataForm;
