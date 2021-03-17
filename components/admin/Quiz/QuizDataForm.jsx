import Link from "next/link";
import { useRouter } from "next/router";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizDataForm.module.scss";

const QuizDataForm = () => {
  const router = useRouter();
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


    let QuizData;

    const AddQuestions=(e)=>
    {
      e.preventDefault();
        QuizData = {
        title : e.currentTarget.quizName.value

      }
      router.push("questions")
      console.log(QuizData);
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
                <img src="/imgs/svgs/EndDate.svg" alt="date" />
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




              <label className="container" id={style.checkbox}>
                 Hide score
              <input type="checkbox" />
              <span className="checkmark"></span>
             </label>

             
              <label className="container" id={style.checkbox}>
                 Active 
              <input type="checkbox"/>
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
