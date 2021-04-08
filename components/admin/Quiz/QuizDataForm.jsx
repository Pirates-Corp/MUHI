import Link from "next/link";
import { useState , useContext , useEffect} from "react"
import { useRouter } from "next/router";
import CenterLayout from "../../Layouts/CenterLayout";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import style from "./QuizDataForm.module.scss";




const QuizDataForm = () => {

    const router = useRouter();
    const Quiz = { };
    let tagsArray = [];

    Quiz.data = null;

    try {
       Quiz.data = JSON.parse(sessionStorage.getItem('Quiz'));
       console.log(Quiz);
       Quiz.noData = false;
    } catch (error) {
       Quiz.noData = true;
      }
      
      if(Quiz.data == null)
      {
        Quiz.noData = true;
      }
  
  
    console.log('onStart : ',Quiz);

  
    useEffect(()=>{

    tagsArray = JSON.parse(localStorage.getItem('QuizTag'));
      document.getElementById("endTime").disabled = true;
        
      if(!(Quiz.data===null))
      {
           const tag = Quiz.data.quizTag.split('-').splice(0,2);
        
          if(document.getElementById("endTime"))
          {
            document.getElementById('endTime').removeAttribute('disabled');
          }

          if(Quiz.data.state === 'Active'){
            document.getElementById('state').checked = true;
          }

          if(tag[1] === 'false')
          {
            document.getElementById('hideScore').checked = false;
          }
          else
          {
            document.getElementById('hideScore').checked = true;
          }

          if(tag[0] === 'close')
          {
            document.getElementById('close').checked = true;
          }
          else
          {
            document.getElementById('open').checked = true;
          }
      }

    });


   
  
    const currentTime =
    new Date().toISOString().split(":")[0] +
    ":" +
    new Date().toISOString().split(":")[1];
    
   

     
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
        duration : Number(e.currentTarget.duration.value) * 60,
        quizTag : e.currentTarget.type.value +"-"+((document.getElementById('hideScore').checked == true)? "true" : "false") +"-"+ e.currentTarget.quizTag.value ,
        schedule : 
         {  startTime : new Date( e.currentTarget.startTime.value).getTime(),
            endTime : new Date(e.currentTarget.endTime.value).getTime()
         },
        state : (document.getElementById('state').checked == true)? "Active" : "Inactive",
        
      }
      let currentStorage =  JSON.parse(sessionStorage.getItem('Quiz'));
      currentStorage = {...currentStorage,...QuizData};
      console.log("Current",currentStorage);
      sessionStorage.setItem('Quiz',JSON.stringify(currentStorage))

      if((router.query.data))
      {
        router.push({
          pathname: 'questions',
          query: { data : "Edit"}
        })
      }
      else
      {
        router.push("questions");
      }
      
    }


    const ExitBtn = (e) =>{
      e.preventDefault();
      sessionStorage.clear();
      window.location.assign('/admin/quiz');
    }


    const EditSaveBtn = async(e) =>{
        e.preventDefault();

      let currentQuizFromStorage =  JSON.parse(sessionStorage.getItem('Quiz'));


      let  QuizData = {
          title : document.getElementById('quizName').value,  
          duration : Number(document.getElementById('quizTime').value) *60 ,
          quizTag : ((document.getElementsByName('type')[0].checked) ? "open" : "close")+"-"+((document.getElementById('hideScore').checked == true)? "true" : "false") +"-"+ document.getElementById('quizTag').value,
          schedule : 
           {  startTime : new Date( document.getElementById("startTime").value).getTime(),
              endTime : new Date(document.getElementById("endTime").value).getTime()
           },
          state : (document.getElementById('state').checked == true)? "Active" : "Inactive",
        }

        console.log("from save",QuizData);


        let updatedQuizData = {...currentQuizFromStorage,...QuizData}


        let res = await fetch(`/api/db/quiz/${currentQuizFromStorage._id}/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body : JSON.stringify(updatedQuizData)
        });
        
        if(res.status===200 || res.status===400)
        {
          router.push('/admin/quiz');
        }
      
      

    }


  return (
    <CenterLayout>
      <PrimaryHeading heading={(router.query.data) ? router.query.data+" Quiz" : "Create Quiz" } />
      <div id={style.formBox}>
        <form  onSubmit={e=> AddQuestions(e)} >
          <div id={style.dataForm}>
            <div className={style.left}>
              <div className="TextBox">
                <img src="/imgs/svgs/QuizName.svg" alt="username" />
                <input
                  type="text"
                  name="quizName"
                  id="quizName"
                  placeholder="Quiz Name"
                  defaultValue = {(Quiz.noData) ? "" : Quiz.data.title}
                  required
                />
              </div>
              <div className="TextBox">
                <img src="/imgs/svgs/TimeTaken.svg" alt="time" />
                <input
                  type="text"
                  id="quizTime"
                  name="duration"
                  defaultValue = {(Quiz.noData)  ? "" : parseInt(Quiz.data.duration/60)}
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
                  defaultValue = {(Quiz.noData)? '' : new String(Quiz.data.quizTag).split('-').splice(2).join('-')}
                  required
                  onKeyUp={e=>showSuggestion(e)}
                />
                <ul className="suggestion">
              
                </ul>
              </div>

            
            
              <label id={style.radio} className="radio">
                <input type="radio" name="type" value="open" id="open"/>
                <span className="inputControl"></span>
                Open
              </label>
              <label id={style.radio} className="radio">
                <input type="radio" name="type" value="close" id="close"  defaultChecked />
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
                  defaultValue = {(Quiz.noData)  ? '' : new Date(Quiz.data.schedule.startTime+19800000).toISOString().split(':',2).join(':')}
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
                  defaultValue = {(Quiz.noData)  ? '' : new Date(Quiz.data.schedule.endTime+19800000).toISOString().split(':',2).join(':')}
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
              <input type="checkbox" name="active" id="state" />
              <span className="checkmark"></span>
             </label>
            </div>
          </div>

          <div className={style.buttonHolder}>
            {/* <Link href="/admin/quiz">
              <a id={style.exit} className="redBtn">Exit</a>
            </Link> */}

            <button id={style.exit} className="redBtn" onClick={e=>{ExitBtn(e)}} >Exit</button>


            {

            (router.query.data) ? <button id={style.exit} className="greenBtn ml-3" onClick={e=>{EditSaveBtn(e)}} >Save & Exit </button> : ""
            }

            <input
              type="submit"
              className="blueBtn"
              name={(router.query.data) ? router.query.data+" Questions" : "Add Questions" }
              value={(router.query.data) ? router.query.data+" Questions" : "Add Questions" }
            />
          </div>
        </form>
      </div>
    </CenterLayout>
  );
};





export default QuizDataForm;
