import React, { useEffect } from 'react'
import TableComponent from "../../../components/admin/Table/TableComponent";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import BaseLayout from "../../../components/Layouts/BaseLayout.jsx";
export default function studentReport({props}) {

  console.log(props);


  const data = [
      ['Siva prakash','1','400','3hr','4',"/admin/report/siva"],
      ['Adile','22','400','3hr','4',"/admin/report/siva"],
      ['Cinta Vj','23','400','3hr','4',"/admin/report/siva"],
      ['Sam','34','400','3hr','4',"/admin/report/siva"],
      ['GodWin','14','400','3hr','4',"/admin/report/siva"],
      ['tharun','1w','400','3hr','4',"/admin/report/siva"],
      ['kitty','1w','400','3hr','5',"/admin/report/siva"],
      ['tharun','1w','400','3hr','4',"/admin/report/siva"],
      ['tharun','1w','400','3hr','4',"/admin/report/siva"]
]

const apiData = [
  ['api Siva prakash','1','400','3hr','4',"/admin/report/siva"],
  ['api Adile','22','400','3hr','4',"/admin/report/siva"],
  ['api Cinta Vj','23','400','3hr','4',"/admin/report/siva"],
  ['api Sam','34','400','3hr','4',"/admin/report/siva"],
  ['api GodWin','14','400','3hr','4',"/admin/report/siva"],
  ['api tharun','1w','400','3hr','4',"/admin/report/siva"],
  ['api kitty','1w','400','3hr','5',"/admin/report/siva"],
  ['api tharun','1w','400','3hr','4',"/admin/report/siva"],
  ['api tharun','1w','400','3hr','4',"/admin/report/siva"]
]

  // useEffect( async()=>{
  //   let res  = await fetch("api/db/report/all", {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });
      
  // })


  return (
    <div>
      <BaseLayout>
        <PrimaryHeading heading="Reports" />
        <TableComponent
          col="5"
          colNames={[]}
          buttonColor="blue"
          buttonText="View"
          tableData={[]}
          apiData={props}
          feature={{
            search : true,
            sort : true,
            filter : true,
            export : true
          }}
        />
      </BaseLayout>
    </div>
  );
}


studentReport.getInitialProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : null;

  const quizRes = await fetch('http://localhost/api/db/quiz/all', {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });
  
  const reportRes  = await fetch('http://localhost/api/db/report/all', {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  let allReports;
  let allQuiz;

  try {
    allReports = await reportRes.json();
    allReports = allReports ? allReports : {}

    allQuiz    = await quizRes.json();
    allQuiz    = allQuiz ? allQuiz:{};
  
  } catch (err) {
    console.error(err);
  }
  return { props: {allReports , allQuiz } };
};