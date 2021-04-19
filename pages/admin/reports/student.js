import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PrimaryHeader from "../../../components/common/Header/PrimaryHeading.jsx";
import BaseLayout from "../../../components/Layouts/BaseLayout.jsx";
import OverallRowCard from "../../../components/common/Cards/OverallRowCards";
import QuizInformationCard from '../../../components/common/Cards/QuizInformationCard'
export default function studentReportAll() {
  const router = useRouter();

  const [OverallRowData, setOverallRowData] = useState([]);
  const [user, setUser] = useState("Student");
  const [allReports, setAllReports] = useState([]);

  useEffect(async () => {
    let id = JSON.parse(router.query.data);

    const studentRes = await fetch(`/api/db/report/${id.split("-")[0]}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let studentData = await studentRes.json();

    let OverallData = [
      {
        color: "secondary",
        imgScr: "/imgs/svgs/Report.svg",
        dataHeading: `Number of tests taken `,
        data: studentData.reports.length ? studentData.reports.length : 0,
      },
      {
        color: "red",
        imgScr: "/imgs/svgs/OverallRanking.svg",
        dataHeading: "Overall Ranking",
        data: studentData.rank ? studentData.rank : 0,
      },
      {
        color: "primary",
        imgScr: "/imgs/svgs/AverageScore.svg",
        dataHeading: "Average Score",
        data: studentData.avgScore ? studentData.avgScore : 0,
      },
    ];


    let allReportsData = []

  

    studentData.reports.map(quiz=>{
      let tagArray = []
      let tagMap = {};
      quiz.report.map((tag) => {
        let tagField = ((tag.chapter + " " + tag.section) ? (tag.chapter + " " + tag.section): "Nodata"  );
        if(tagField === "Nodata")
        {
            tagArray.push({
              tagname : "No questions Attended",
              data: ''
            })
        }
        else
        {
            if (tag.chapter + " - " + tag.section in tagMap)
            {
              tagMap[tag.chapter + " - " + tag.section] =  tagMap[tag.chapter + " - " + tag.section] +  parseInt(tag.result);
            }
            else
            { 
              tagMap[tag.chapter + " - " + tag.section] =   parseInt(tag.result);
            }
        }
      });
      
      for(let index = 0; index < Object.keys(tagMap).length ; index++ )
      {
        tagArray.push({
          tagname : Object.keys(tagMap)[index],
          data: Object.values(tagMap)[index] 
        })
      }
    
      
      if(tagArray.length === 0)
      {
        tagArray.push({
          tagname : "No questions Attended",
          data: ''
        })
      }
      
         

       let quizObj={
        quizName : quiz.id,
        quizData : [
              {
                heading : "Total Score",
                icon : "/imgs/svgs/TotalScore.svg",
                data: (quiz.score.taken) +"/"+ quiz.score.total
              },
              {
                heading : "Time Taken",
                icon : "/imgs/svgs/TimeTaken.svg",
                data: parseInt(quiz.time.taken/60)+"/"+parseInt(quiz.time.total/60)
              },
              {
                heading : "Rank",
                icon : "/imgs/svgs/Rank.svg",
                data: quiz.rank
              },
              {
                heading : "Status",
                icon : "/imgs/svgs/Result.svg",
                data: (quiz.status) ? "Completed" : "In-Complete"
              }
              
            ],
            tagData: tagArray,
            buttonData:{
                  apiUrl: "google.com",
                  reqType:"POST",
                  edit : false,
                  delete : true,
                  deleteAction : "deleteReport",
                  bodyData : {
                                userId : JSON.parse(router.query.data).split("-")[0],
                                quizId : quiz.id
                              }
                }

         }
      allReportsData.push(quizObj);
      tagMap={};         
    })

   
 
    setOverallRowData(OverallData);
    setUser(JSON.parse(router.query.data).split("-")[1]);
    setAllReports(allReportsData)
  }, [router.query.data]);

  return (
    <div>
      <BaseLayout>
        <PrimaryHeader heading={user + "'s Report"} />
        <OverallRowCard data={OverallRowData} />
        <QuizInformationCard 
          view={{
            quizData : true,
            tagData :  true,
            showButtons : true
          }}
        apiData={allReports}
       />
      </BaseLayout>
    </div>
  );
}



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
