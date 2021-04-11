import { useState ,useEffect } from 'react'
import GreetingHeader from '../common/Header/GreetingHeader'
import BaseLayout from '../Layouts/BaseLayout'
import SubHeader from '../common/Header/SubHeading'
import OverallRowCard from '../common/Cards/OverallRowCards'
import QuizInformationCard from '../common/Cards/QuizInformationCard'
const adminDashboard = ()=>{

const [overallRowCardData ,setOverallRowCardData] = useState([]);
const [QuizInformationCardData , setQuizInformationCardData] = useState([]);


    
  
  let OverallData = [
    {
        color : "secondary",
        imgScr : "/imgs/svgs/Group.svg",
        dataHeading : `Number of Users `,
        data : (overallRowCardData.hasOwnProperty("totalUsers"))? overallRowCardData.totalUsers : 0
    },
    {
        color : "red",
        imgScr : "/imgs/svgs/Group.svg",
        dataHeading : "Open Quizzes Taken",
        data : (overallRowCardData.hasOwnProperty("totalAUsers")) ? overallRowCardData.totalAUsers : 0
    },
    // {
    //     color : "primary",
    //     imgScr : "/imgs/svgs/AverageScore.svg",
    //     dataHeading : "Average Score",
    //     data :(overallRowCardData.hasOwnProperty("avgScore")) ? overallRowCardData.avgScore : 0  
    // }
    ]


    useEffect(async ()=>{
   
        const allUsersRes = await fetch("/api/db/user/all", {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        });
        const allAUsersRes = await fetch("/api/db/auser/all", {
            method: "GET",
            headers: { "Content-Type": "application/json"},
            });

        const allQuizzesRes = await fetch("/api/db/quiz/all", {
            method: "GET",
            headers: { "Content-Type": "application/json"},
            });

        const allReportRes = await fetch("/api/db/report/all", {
            method: "GET",
            headers: { "Content-Type": "application/json"},
            });
        
    
        
        const allUsers   = await allUsersRes.json();
        const allAUsers  = await allAUsersRes.json();
        const allReports = await allReportRes.json();
        const allQuizzes = await allQuizzesRes.json();

          


        
        //---------------------------------------------------------------------
        
        let totalUsers = 0;
        allUsers.map(user=>(user.role === 'user') ? ++totalUsers : totalUsers);

        const infoCardData = [];

        allQuizzes.map(quiz=>{
            let takenUserCount = 0;
            let totalTime  = 0; 
            let totalScoreInQuiz = 0;  

            allReports.map(userReport=>{
                userReport.reports.map(reportQuiz=>{
                    if(quiz._id === reportQuiz.id)
                    { 
                        allUsers.map(user=>{
                           if( user._id == userReport._id)
                           {
                            ++takenUserCount;
                            totalTime += parseInt(reportQuiz.time.taken/60);
                            //console.log(quiz._id,userReport._id,reportQuiz.score.taken);
                            totalScoreInQuiz += reportQuiz.score.taken;
                           } 
                        })
                    }
                })
            })
            let singleQuizItem = {
                quizName : quiz.title,
                quizData : [
                    {
                        heading : "Average Time Taken",
                        icon    : "/imgs/svgs/TimeTaken.svg",
                        data    : isNaN(parseInt(totalTime/takenUserCount)) ? 0+" Mins" : parseInt(totalTime/takenUserCount) +" Mins"
                    }
                    ,
                    {
                        heading : "Average Total Score",
                        icon    : "/imgs/svgs/TotalScore.svg",
                        data    : isNaN(parseInt(totalScoreInQuiz/takenUserCount)) ? 0 : parseInt(totalScoreInQuiz/takenUserCount)
                    }
                    ,
                    {
                        heading : "Attended",
                        icon    : "/imgs/svgs/UserName.svg",
                        data    : takenUserCount +" Students"
                    }
                    ,
                    {
                        heading : "Result Status",
                        icon    : "/imgs/svgs/Result.svg",
                        data    : quiz.quizTag.split('-')[1]=='true' ? 'Hidden' : 'Visible'
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
           infoCardData.push(singleQuizItem);
        })


        setQuizInformationCardData(infoCardData)
        setOverallRowCardData({totalUsers,totalAUsers : allAUsers.length});
    },[])


    return(
        <BaseLayout>
         <GreetingHeader />
         <OverallRowCard data={OverallData} />
         <SubHeader heading="Overall Quiz Info"/>
         <QuizInformationCard 
            view={{
                quizData : true,
                tagData :  false,
                showButtons : false
            }}
            apiData={QuizInformationCardData}
       />
        </BaseLayout>
    )
}

export default adminDashboard;