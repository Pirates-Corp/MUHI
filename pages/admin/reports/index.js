import React, { useEffect } from 'react'
import TableComponent from "../../../components/admin/Table/TableComponent";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import BaseLayout from "../../../components/Layouts/BaseLayout.jsx";
export default function studentReport({props}) {

  console.log(props);





  return (
    <div>
      <BaseLayout>
        <PrimaryHeading heading="Reports" />
        <TableComponent
          col="5"
          colNames={[]}
          buttonColor="blue"
          buttonText="View"
          tableData={null}
          apiData={props}
          feature={{
            search : true,
            sort : false,
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

  const quizRes = await fetch('http://localhost:3000/api/db/quiz/all', {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  const userRes = await fetch('http://localhost:3000/api/db/user/all', {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });
  


  const reportRes  = await fetch('http://localhost:3000/api/db/report/all', {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });

  let allReports;
  let allQuiz;
  let allUsers;


    allReports = await reportRes.json();


    allQuiz    = await quizRes.json();


    allUsers    = await userRes.json();
    
  
  return { props: {allReports , allQuiz , allUsers } };
};

