import Link from "next/link";
import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from "../../user/Quiz/QuizTopicCardComponent.module.scss";

const QuizTopicCardComponent = ({ props }) => {

  console.log("Quiz Props",props);

  const quizArray = props.quizData ? props.quizData : [];
  const currentUser = props.currentUser ? props.currentUser : {}
  const currentUserReport = props.currentUserReport ? props.currentUserReport : {}
  const offsetInMillis = new Date().getTimezoneOffset() * 60000;

  const getDateString = (timeInMillis) => {
    let date = new Date(timeInMillis + offsetInMillis);
    date.setSeconds(0);
    let isoString = date.toLocaleString();
    return isoString;
    // return isoString.substring(0,isoString.indexOf('.')-3).replace("T"," ");
    // return isoString.substring(0, isoString.indexOf("T"));
  };



  let QuizToShow = [];
  let quizCardData ;
  
  quizArray.map(quiz=>{
    // quiz.quizTag.split('-')[0].toLowerCase() === 'close'
    if(true)
    {
      currentUserReport.reports.map((report)=>{
        if(report.id === quiz._id)
        {
          console.log(quiz.title);
         quizCardData = {
            title     : quiz.title,
            duration  : quiz.duration,
            questions : quiz.questions.length,
            endTime   : quiz.schedule.endTime,
            pathname  : "quiz/"+quiz.title,
            status    : (report.status===1) ? false : true
          }
        }

      })
      QuizToShow.push(quizCardData);
    }
   
  })


  return (
    <>
      <PrimaryHeader heading="MUHI Quiz" />
      <div id={style.quizCardsHolder}>
       {QuizToShow.map((quiz, index) => (
           
             <div className={style.quizCard}>
               <h2>{quiz.title}</h2>
               <ul>
                 <li>
                   <img src="imgs/svgs/TimeW.svg" alt="" />
                   <p>{`${quiz.duration/60} Mins`}</p>
                 </li>
                 <li>
                   <img src="imgs/svgs/FileW.svg" alt="" />
                   <p>{`${quiz.questions} Questions`}</p>
                 </li>
                 {/* <li>
                   <img src="imgs/svgs/EndDateW.svg" alt="" />
                   <p>Start Time : {getDateString(quiz.schedule.startTime)}</p>
                 </li> */}
                 <li>
                   <img src="imgs/svgs/EndDateW.svg" alt="" />
                   <p>End Time : {getDateString(quiz.endTime)}</p>
                 </li>
               </ul>
               <div id={style.quizBtnHolder}>
                 
                 {(quiz.status)?
                   (
                     <Link
                       href={{
                     pathname: "quiz/"+quiz.title,
                     query: {
                       questionId: 0,
                     },
                   }}
                 >
                   <a className={style.quizBtn}>Take Quiz</a>
                 </Link>
                   ) :
                   (
                     <Link
                     href='#'
                   >
                     <a className={style.quizBtn} style={{"background" : "var(--white)","color" : "var(--primary)"}}>Completed</a>
                   </Link>
                   )}
               </div>
             </div>
    
           ))}
      </div>
    </>
  );
};

export default QuizTopicCardComponent;


