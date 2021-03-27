import { useState ,useEffect } from 'react'
import BaseLayout from '../Layouts/BaseLayout'
import PropPass from '../Layouts/PropPass'
import GreetingHeader from '../common/Header/GreetingHeader'
import OverallRowCard from '../common/Cards/OverallRowCards'
import QuizInformationCard from '../common/Cards/QuizInformationCard'
const userDashboard = () => {

  const [overallRowCardData ,setOverallRowCardData] = useState([]);

  console.log(overallRowCardData);
 
 
  

  
  let OverallData = [
    {
        color : "secondary",
        imgScr : "/imgs/svgs/Report.svg",
        dataHeading : `Number of tests taken `,
        data : "10"
    },
    {
        color : "red",
        imgScr : "/imgs/svgs/OverallRanking.svg",
        dataHeading : "Overall Ranking",
        data : overallRowCardData.rank
    },
    {
        color : "primary",
        imgScr : "/imgs/svgs/AverageScore.svg",
        dataHeading : "Average Score",
        data : overallRowCardData.avgScore 
    }
]


 useEffect(async ()=>{
   
    const userRes = await fetch("http://localhost/api/db/user", {
    method: "GET",
    headers: { "Content-Type": "application/json"},
    });

   const user = await userRes.json();

   const userReportRes = await fetch(`http://localhost/api/db/report/${user.email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json"},
    });

   const userReport = await userReportRes.json();
 
   setOverallRowCardData(userReport);


 },[])



  return (
    <>
    <BaseLayout>
      <PropPass type="user" />
      <GreetingHeader for="user" />
      <OverallRowCard data={OverallData}/>
      <QuizInformationCard />
    </BaseLayout>
    </>
  );
};

export default userDashboard;

// userDashboard.getInitialProps = async (ctx) => {
//   const cookie = ctx.req ? ctx.req.headers.cookie : null;


//   let allQuiz = "hello"
//   const reportRes  = await fetch('http://localhost/api/db/report/all', {
//     method: "GET",
//     headers: { "Content-Type": "application/json", cookie },
//   });

//   let allReports;
//   let allQuiz;

//   try {
//     allReports = await reportRes.json();
//     allReports = allReports ? allReports : {}

//     allQuiz    = await quizRes.json();
//     allQuiz    = allQuiz ? allQuiz:{};
  
//   } catch (err) {
//     console.error(err);
//   }
//   return { props: {userRes , allQuiz } };
// };