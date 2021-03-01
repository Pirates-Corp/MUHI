import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizDataForm.module.scss";
const QuizDataForm = () => {

  const currentTime = new Date().toISOString().split(':')[0]+':'+new Date().toISOString().split(':')[1]; 


  
  return (
    <CenterLayout>
      <PrimaryHeading heading="Create Quiz" />
      <div id={style.formBox}>
        <form id={style.dataForm}>
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
                onChange={e => {onKeyPress(e)}}
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
                  onChange={(e) => {document.getElementById('endDate').min = e.target.value
                  document.getElementById('endDate').removeAttribute('disabled')}}
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
                  onChange={(e) => {document.getElementById('startDate').max = e.target.value}}
                  id="endDate"
                  name="endDate"
                  placeholder="end Date"
                  required
                />
            </div>

          
          

          </div>
        </form>
      </div>
    </CenterLayout>
  );
};

export default QuizDataForm;
