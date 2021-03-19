import Link from "next/link";
import { useState , useContext} from "react"
import { useRouter } from "next/router";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizDataForm.module.scss";
import {QuizContext} from "../../../utils/contextStore/quizData";


const QuizDataForm = () => {

    const router = useRouter();
    const [Quiz , setQuiz] = useContext(QuizContext);
   
  
    console.log('onStart : ',Quiz);

  
    const currentTime =
    new Date().toISOString().split(":")[0] +
    ":" +
    new Date().toISOString().split(":")[1];
    
    let tagsArray = ["Basic","Advance","Intermediate","Advance2"];

     
    const showSuggestion = (e)=>
    {
      const suggestionBox = document.querySelector('.suggestion');
      let input = e.target.value;
      suggestionBox.innerHTML = "";
      let resTags =  tagsArray.filter((tag)=>tag.toLowerCase().startsWith(input.toLowerCase()))
      resTags.forEach(tagName=>{
        const  li = document.createElement('li');
        li.innerText = tagName;
        li.addEventListener("click",()=> 
        {
          document.getElementById('quizTag').value = tagName
          suggestionBox.innerHTML = "";
        });
        suggestionBox.appendChild(li);
      }) 

      if(input === "")
      {
        suggestionBox.innerHTML = "";
      }
    }






    const AddQuestions=(e)=>
    {    
      let QuizData;

      e.preventDefault();
        QuizData = {
        title : e.currentTarget.quizName.value,
        duration : e.currentTarget.duration.value,
        quizTag : e.currentTarget.quizTag.value +" - "+ e.currentTarget.type.value,
        schedule : 
         {  startTime : e.currentTarget.startTime.value,
            endTime : e.currentTarget.endTime.value
         },
        state : (document.getElementById('state').checked == true)? "true" : "false",
        hideScore : (document.getElementById('hideScore').checked == true)? "true" : "false"
      }
  
    
      setQuiz(QuizData);
      router.push("questions")
      
    }


  return (
    <CenterLayout>
      <PrimaryHeading heading="Create Quiz" />
      <div id={style.formBox}>
        <form  onSubmit={e=> AddQuestions(e)} >
          <div id={style.dataForm}>
            <div className={style.left}>
              <div className="TextBox">
                <img src="/imgs/svgs/QuizName.svg" alt="username" />
                <input
                  type="text"
                  id="quizName"
                  name="quizName"
                  placeholder="Quiz Name"
                  value = {(Quiz.title==='') ? "" : Quiz.title}
                  required
                />
              </div>
              <div className="TextBox">
                <img src="/imgs/svgs/TimeTaken.svg" alt="time" />
                <input
                  type="text"
                  id="quizTime"
                  name="duration"
                  value = {(Quiz.duration==='') ? "" : Quiz.duration}
                  placeholder="Duration In mins"
                  required
                />
              </div>


              <div className="TextBox" >
                <img src="/imgs/svgs/Tags.svg" alt="time" />
                <input
                  type="text"
                  id="quizTag"
                  name="quiztag"
                  placeholder="Quiz tag"
                  required
                  onKeyUp={e=>showSuggestion(e)}
                />
                <ul className="suggestion">
              
                </ul>
              </div>

            
            
              <label id={style.radio} className="radio">
                <input type="radio" name="type" value="open" />
                <span className="inputControl"></span>
                Open
              </label>
              <label id={style.radio} className="radio">
                <input type="radio" name="type" value="close" defaultChecked />
                <span className="inputControl"></span>
                Close
              </label>

            

            </div>
            <div className={style.right}>
              <div className="TextBox">
                <img src="/imgs/svgs/StartDate.svg" alt="date" />
                <input
                  type="datetime-local"
                  min={currentTime}
                  id="startTime"
                  name="startTime"
                  onChange={(e) => {
                    document.getElementById("endTime").min = e.target.value;
                    document
                      .getElementById("endTime")
                      .removeAttribute("disabled");
                  }}
                  placeholder="Start Date"
                  required
                />
              </div>

              <div className="TextBox">
                <img src="/imgs/svgs/EndDate.svg" alt="date" />
                <input
                  disabled
                  type="datetime-local"
                  min={currentTime}
                  onChange={(e) => {
                    document.getElementById("startTime").max = e.target.value;
                  }}
                  id="endTime"
                  name="endTime"
                  placeholder="end Date"
                  required
                />
              </div>




              <label className="container" id={style.checkbox}>
                 Hide score
                <input type="checkbox" name="hideScore" id="hideScore" />
                <span className="checkmark"></span>
             </label>

             
              <label className="container" id={style.checkbox}>
                 Active 
              <input type="checkbox" name="active" id="state"/>
              <span className="checkmark"></span>
             </label>
            </div>
          </div>

          <div className={style.buttonHolder}>
            <Link href="/admin/quiz">
              <a id={style.exit} className="redBtn">Exit</a>
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
