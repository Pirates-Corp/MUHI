import React, { useEffect } from "react";
import XLSX from "xlsx";
import style from "../../admin/Table/TableComponent.module.scss";
import saveAs from "../../../utils/other/fileSaver";
import {useRouter} from "next/router"


const TableComponent = (props) => {
   const router = useRouter();
  const QuizList = [];

  const {
    apiData,
    tableData,
    col,
    colNames,
    buttonColor,
    buttonText,
    feature,
  } = props;
 
 
  //Quiz List
  if(tableData == null)
  {
    apiData.allQuiz.map((quiz) => {
      QuizList.push(quiz.title);
    });
  }
  

  let studentCol = [
    "Student Name",
    "Overall Rank",
    "Average Score",
    "Quizzes Taken",
  ];

   //Load initial Student Data
   const initialStudentsData = () => {
    let allStudents = [];
      apiData.allReports.map((user) => {
        let row = Object.values(user).slice(1, 3);
        row.push(user.reports.length);
        apiData.allUsers.map((student)=>{
          if(user._id===student._id)
          {
            if(student.role=="user")
            {
              row.unshift(student.name);
              row.push(student.email);
            }
            else
            {
            row = [];
            }
          }
       })
        if(row.length!==0 && row.length>=5)
        {
          allStudents.push(row);
        }
      });
    return allStudents;
  };

  const [tableCol, setTableCol] = React.useState(col);
  const [quizListState, setQuizListState] = React.useState(QuizList);
  const [viewColNames, setViewColName] = React.useState(tableData == null ? studentCol : colNames);
  const [exportHeader, setExportHeader] = React.useState((tableData == null) ?"All students" : "tableDataExport");
  const [rawTableData, setRawTableData] = React.useState((tableData == null) ? initialStudentsData() : tableData);
  const [viewData, setViewData] = React.useState( (tableData == null) ? rawTableData  : tableData);

  useEffect(() => {

    if(tableData==null)
    {
      setViewData(rawTableData)
    }
    else
    {
      setViewData(tableData)
      setRawTableData(tableData)
    }

  },[rawTableData,tableData])

  console.log("rawTableData=>",rawTableData);

 

  //Search option
  const searchData = (e) => {
    e.preventDefault();

    const searchString = document.getElementById("searchText").value.toString().toLowerCase();
    let resultData = rawTableData.filter(el=>el[0].toLowerCase().includes(searchString.trim()));
    console.log(rawTableData[0][0].includes(searchString.toLowerCase().trim()));
    console.log("resultData => ",resultData);
    //setViewData((searchString.length==0)?rawTableData:resultData);
    setViewData(resultData);
  };

  //filter option
  const filterFunction = (event) => {
    const currentQuiz = event.target.value;
    let cols = [];
    let studentData = [];
    let tableColLen = col;
    if(currentQuiz=="All students")
    {  
     setRawTableData(initialStudentsData())
     cols = studentCol;
    }
    else
    {
      apiData.allReports.map((user)=>{

        user.reports.map(quiz=>{
          
          if(quiz.id.toLowerCase()==currentQuiz.toLowerCase())
          {
                 //row = Object.values(user).slice(2,3);
                 let row = [];
                 row.push(quiz.rank);
                 row.push(user.avgScore)
                 row.push(quiz.score.taken+'/'+quiz.score.total);
                 row.push(parseInt(quiz.time.taken/60)+'/'+parseInt(quiz.time.total/60))
                 apiData.allUsers.map((student)=>{
                    if(user._id===student._id)
                    {
                      row.unshift(student.name);
                      row.push(student.email);
                    }
                 })
                 if(row.length!==0 && row.length>=5)
                 {
                   studentData.push(row);
                 }
               }
             })
         })
         
         setRawTableData(studentData)
         cols = ['Student Name','Rank','Average Score','score','Time Taken']
         tableColLen = cols.length+1;
     }
    setExportHeader(currentQuiz)
    setTableCol(tableColLen)
    setViewColName(cols)
    setViewData(rawTableData);

    console.log("rawData",rawTableData);
    console.log("studentData",studentData);
  };

  //sort option
  const sortFunction = (event) => {
    let sortBy = event.target.value;
    let sortView = [];
    let sortArr = [];
    const index = viewColNames.indexOf(sortBy);

    if (sortBy == "Sort By") {
      setViewData(rawTableData);
    } else {
      viewData.map((arr) => {
        sortArr.push(arr[index]);    
      });

      // sortArr.sort(function (a, b) {
      //   return ('' + a.toLowerCase()).localeCompare(b.toLowerCase());
      //  });

      sortArr.sort();

      sortArr.map((key) => {
        viewData.map((arr) => {
          if (key == arr[index]) {
            sortView.push(arr);
          }
        });
      });

      setViewData(sortView);
    }
  };

  //Export option
  const exportFile = () => {
    let ExportData = [];
    let ExportObjArr = [];
    if (exportHeader) {
      if (exportHeader == "All students") {
        const exportStudentCol = [
          "Student Name",
          "Email",
          "Overall Rank",
          "Average Score",
          "Quizzes Taken",
        ];
        apiData.allReports.map((user) => {
          let row = Object.values(user).slice(0, 3);
          row.push(user.reports.length);
          apiData.allUsers.map((student)=>{
            if(user._id===student._id)
            {
              if(student.role=="user")
              {
                row.unshift(student.name);
              }
              else
              {
                row = [];
              }
            }
         })
         if(row.length!==0)
        {
          ExportData.push(row);
        }
        });
        ExportData.unshift(exportStudentCol);
      } 
      else if(exportHeader == "tableDataExport")
      {
        console.log(tableData);
        ExportData.push(viewColNames);
        ExportData.push(...tableData.map(e=>e.splice(0,5)));

      }
      else {
        let header = [];
        const exportQuizCol = [
          "Student Name",
          "Email",
          "Rank",
          "Average Score",
          "Score",
          "Time Taken",
          "Status",
          "Questions Attended",
        ];
        apiData.allReports.map((user) => {
          user.reports.map((quiz) => {
            
            if (quiz.id.toLowerCase() == exportHeader.toLowerCase()) {
              let tagMap = {};
              let studentObj = {};


                apiData.allUsers.map((student)=>{
                  if(user._id===student._id)
                  {
                    studentObj["Student Name"] = student.name;
                  }
              })
              studentObj.Email = user._id;
              studentObj.Rank = quiz.rank;
              studentObj["Average Score"] = user.avgScore;
              studentObj.Score = quiz.score.taken + "/" + quiz.score.total;
              studentObj["Time Taken"] = parseInt(quiz.time.taken/60) + "/" + parseInt(quiz.time.total/60) + "Mins";
              studentObj["Status"] = (quiz.status)?"Completed" : "InComplete";
              studentObj["Questions Attended"] = quiz.questionsAttended.length;
              

              quiz.report.map((tag) => {
                
                if (tag.chapter + "_" + tag.section in tagMap)
                 {
                   tagMap[tag.chapter + "_" + tag.section] =
                   tagMap[tag.chapter + "_" + tag.section] +  parseInt(tag.result);
                 }
                else
                {
             
                  tagMap[tag.chapter + "_" + tag.section] =   parseInt(tag.result);
                }
              });

              const newObj = {...studentObj,...tagMap}
              ExportObjArr.push(newObj);
              exportQuizCol.push(...Object.keys(tagMap).map((key) => key));
              
            }
          });
        });
        
        header = Array.from(new Set(exportQuizCol));
        // console.log("export obj array---->",ExportObjArr);
        // console.log("header---->",header);

        ExportObjArr.forEach(studentObject=>{
          let row = [];
          

          header.forEach(headerName=>{
            row.push(studentObject[headerName] ? studentObject[headerName]: 0);
          })

          ExportData.push(row);
        })

        ExportData.unshift(header);
        
      }
    } else {
      ExportData.push(viewData);
      ExportData.unshift(viewColNames);
    }

    // console.log("Export Data ====> ",ExportData);

    let wb = XLSX.utils.book_new();
    wb.Props = {
      Title: exportHeader + "- Reports",
      Subject: exportHeader,
      Author: "MUHI",
      CreatedDate: new Date(),
    };

    wb.SheetNames.push("Sheet 1");
    let ws_data = ExportData;
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Sheet 1"] = ws;

    let wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
      let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      let view = new Uint8Array(buf); //create uint8array as viewer
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
      return buf;
    }
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      `${exportHeader}-Reports.xlsx`
    );
  };

 //Button Action
 const onButtonAction = async(url,StudentName,buttonText)=>{
   console.log(buttonText);
   if(buttonText.toLowerCase().startsWith("view"))
   {
      console.log(url,buttonText);
       router.push({
        pathname: '/admin/reports/student',
        query: { data: JSON.stringify(url+'-'+StudentName)}
      })
    }
    else if(buttonText.toLowerCase().startsWith("allow"))
    {
      let res = confirm(`Are sure , want to Active the ${StudentName} ?`)
      if(res) 
      {
        console.log(url.split('-')[0]);
        await fetch(url.split('-')[0],{method : 'PUT'});
        window.location.reload();
      }
    }
    else if(buttonText.toLowerCase().startsWith("suspend"))
    {
      let res = confirm(`Are sure , want to Suspend the ${StudentName} ?`)
      if(res) 
      {
        await fetch(url,{method : 'PUT'});
        window.location.reload();
      }
    }

 }


  return (
    <div id={style.tableBox}>
      <div className={style.tableFeature}>
        <div
          id={style.form}
          style={
            feature.search ? { display: "inline-block" } : { display: "none" }
          }
        >
          <input
            type="text"
            id="searchText"
            onChange={(e) => searchData(e)}
            placeholder="Search"
            required
          />
          <div className={style.searchBtn}>
            <img src="/imgs/svgs/search.svg" alt="" />
          </div>
        </div>

        <div
          className="dropDown"
          style={
            feature.sort ? { display: "inline-block" } : { display: "none" }
          }
        >
          <img src="/imgs/svgs/Sort.svg" alt="" />
          <select onChange={sortFunction}>
            <option disabled defaultValue="Sort By" hidden selected>
              Sort By
            </option>
            <optgroup label="Default View">
              <option value="Sort By">Sort By</option>
            </optgroup>
            <optgroup label="Sort Options">
              {viewColNames.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </optgroup>
          </select>
          <span className="dropDrownArrow"></span>
        </div>

        <div
          className="dropDown"
          style={
            feature.filter ? { display: "inline-block" } : { display: "none" }
          }
        >
          <img src="/imgs/svgs/Filter.svg" alt="" />
          <select onChange={filterFunction}>
            <option disabled defaultValue="filter by" selected hidden>
              Filter By Quiz
            </option>
            <optgroup label="Default View">
              <option>All students</option>
            </optgroup>
            <optgroup label="Filter by Quizzes">
              {quizListState.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </optgroup>
          </select>
          <span className="dropDrownArrow"></span>
        </div>

        <button
          id={style.fbtn}
          onClick={() => {
            exportFile(viewData, viewColNames);
          }}
          className="greenBtn mt-1"
          style={
            feature.export ? { display: "inline-block" } : { display: "none" }
          }
        >
          Export
        </button>
      </div>

      <div className={style.tableScroll}>
        <ul className={style.table} style={{ "--col": tableCol }}>
          <li id={style.tableHeader}>
            <p>s.no </p>
            {viewColNames.map((colName) => (
              <p>{colName}</p>
            ))}
          </li>
          {(viewData.length == 0)  ? (
            <li id={style.noDataBox}>
              <center>
                <p>No Data Found</p>
              </center>
            </li>
          ) : (
            viewData.map((arr, index) => (
              <li className={style.row}>
                <p>{index + 1}</p>
                {arr.slice(0, arr.length - 1).map((e) => (
                  <p>{e}</p>
                ))}
                   {console.log(arr)}
                <button style={{"font-size":"1rem"}} className={((arr[arr.length - 1].split('-')[1]=='suspend')?"green":buttonColor)+"Btn"} onClick={()=>onButtonAction(arr[arr.length - 1],    arr[0]   ,(arr[arr.length - 1].split('-')[1]=='suspend')?"Allow":buttonText)}>
                    {(arr[arr.length - 1].split('-')[1]=='suspend')?"Active":buttonText}  
                </button>
              
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TableComponent;

// [{
//   "id": 1,
//   "chapter": "test chapter",
//   "section": "test section",
//   "result": "1"
// },
// {
//   "id": 2,
//   "chapter": "test chapter - change",
//   "section": "test section",
//   "result": "1"
// },
// {
//   "id": 1,
//   "chapter": "test chapter",
//   "section": "test section",
//   "result": "1"
// },
// {
//   "id": 2,
//   "chapter": "test chapter - change",
//   "section": "test section",
//   "result": "1"
// }]

// const chapterWithSection = tag.chapter +"_"+tag.section;

//                      if(chapterWithSection in tagMap)
//                      {
//                        tagMap[chapterWithSection] = tag[chapterWithSection] +  tag.result ;
//                      }
//                     else
//                     {

//                       tagMap[chapterWithSection] = tag.result;
//                     }
