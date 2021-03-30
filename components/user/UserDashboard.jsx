import { useState ,useEffect } from 'react'
import BaseLayout from '../Layouts/BaseLayout'
import PropPass from '../Layouts/PropPass'
import GreetingHeader from '../common/Header/GreetingHeader'
import OverallRowCard from '../common/Cards/OverallRowCards'
import QuizInformationCard from '../common/Cards/QuizInformationCard'
const userDashboard = () => {

  const [overallRowCardData ,setOverallRowCardData] = useState([]);
  const [QuizInformationCardData , setQuizInformationCardData] = useState([]);
;
 
  
  

  
  let OverallData = [
    {
        color : "secondary",
        imgScr : "/imgs/svgs/Report.svg",
        dataHeading : `Number of tests taken `,
        data : (overallRowCardData.hasOwnProperty("reports"))? overallRowCardData.reports.length : 0
    },
    {
        color : "red",
        imgScr : "/imgs/svgs/OverallRanking.svg",
        dataHeading : "Overall Ranking",
        data : (overallRowCardData.hasOwnProperty("rank")) ? overallRowCardData.rank : 0
    },
    {
        color : "primary",
        imgScr : "/imgs/svgs/AverageScore.svg",
        dataHeading : "Average Score",
        data :(overallRowCardData.hasOwnProperty("avgScore")) ? overallRowCardData.avgScore : 0  
    }
    ]



    
      






 useEffect(async ()=>{
   
    const userRes = await fetch("/api/db/user", {
    method: "GET",
    headers: { "Content-Type": "application/json"},
    });

   const user = await userRes.json();

   const userReportsRes = await fetch(`/api/db/report/${user.email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json"},
    });
    
    const userReports = await userReportsRes.json();

    const allQuizRes = await fetch(`/api/db/quiz/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json"},
      });

      const allQuiz = await allQuizRes.json();
      const reports = [];

      userReports.reports.map(takenQuiz=>{
        allQuiz.map(quiz=>{
          if(takenQuiz.id === quiz._id)
          {

            if(!(Boolean(quiz.quizTag.split('-')[1])))
            {
              
            // console.log("test",quiz.quizTag,takenQuiz.id);
            // //   console.log(takenQuiz);
              
              let  singleQuiz = { quizName : takenQuiz.id,
                                  quizData : [
                                    {
                                      heading : "Total Score",
                                      icon : "/imgs/svgs/TotalScore.svg",
                                      data: takenQuiz.score.taken+"/"+takenQuiz.score.total
                                    },
                                    {
                                      heading : "Time Taken",
                                      icon : "/imgs/svgs/TimeTaken.svg",
                                      data: parseInt(takenQuiz.time.taken/60) +"/"+parseInt(takenQuiz.time.total/60)
                                    },
                                    {
                                      heading : "Rank",
                                      icon : "/imgs/svgs/Rank.svg",
                                      data: takenQuiz.rank
                                    }
                                  ],
                                  buttonData:{
                                        apiUrl: "",
                                        reqType:"",
                                        edit : false,
                                        delete : false,
                                        bodyData : {}
                                      }
                                }
  
  
                reports.push(singleQuiz);
            }
          }
        })
      })


   setQuizInformationCardData(reports)
   setOverallRowCardData(userReports);

 },[])



  return (
    <>
    <BaseLayout>
      <PropPass type="user" />
      <GreetingHeader for="user" />
      <OverallRowCard data={OverallData}/>
      <QuizInformationCard 
      view={{
         quizData : true,
         tagData :  false,
         showButtons : false
      }}
      apiData={QuizInformationCardData}
       />
    </BaseLayout>
    </>
  );
};

export default userDashboard;














// let QuizInformationCardData = 
              
// [ {
//   quizName : "Basic of Islam",
//   quizData : [
//     {
//       heading : "Total Score",
//       icon : "/imgs/svgs/TotalScore.svg",
//       data: "20/40"
//     },
//     {
//       heading : "Time Taken",
//       icon : "/imgs/svgs/TimeTaken.svg",
//       data: "25 Min"
//     },
//     {
//       heading : "Rank",
//       icon : "/imgs/svgs/Rank.svg",
//       data: "3"
//     }
//   ]
// ,
//   tagData: [

//     {
//       tagname : "Abu - personal",
//       data: "2"
//     },
//     {
//       tagname : "Abu - private",
//       data: "5"
//     },
//     {
//       tagname : "Abu - personal",
//       data: "3"
//     }

//   ]
//   ,
//   buttonData:{
//     apiUrl: "google.com",
//     reqType:"POST"
//   }
  
// },
// {
//   quizName : "Holy Quran",
//   quizData : [
//     {
//       heading : "Total Score",
//       icon : "/imgs/svgs/TotalScore.svg",
//       data: "20/40"
//     },
//     {
//       heading : "Time Taken",
//       icon : "/imgs/svgs/TimeTaken.svg",
//       data: "25 Min"
//     },
//     {
//       heading : "Rank",
//       icon : "/imgs/svgs/Rank.svg",
//       data: "3"
//     }
//   ]
// ,
//   tagData: [

//     {
//       tagname : "Abu - personal",
//       data: "2"
//     },
//     {
//       tagname : "Abu - private",
//       data: "5"
//     },
//     {
//       tagname : "Abu - personal",
//       data: "3"
//     }

//   ]
//   ,
//   buttonData:{
//     apiUrl: "google.com",
//     reqType:"POST",
//     edit : true,
//     delete : true,
//     bodyData : {test : "hello"}
//   }
  
// }
// ]


