import React from "react";
import XLSX from 'xlsx';
import style from "../../admin/Table/TableComponent.module.scss";
import Link from "next/link";
import saveAs from "../../../utils/other/fileSaver"

let rawTableData ;



const TableComponent = (props) => {
  const QuizList = [];
  const { apiData, tableData, col , colNames , buttonColor, buttonText ,feature} = props;
 
  rawTableData = tableData;
  let studentData = [];
  let studentCol = ['Student Name','Overall Rank','Average Score','Quizzes Taken']


  //Load initial Student Data 
  const initialStudentsData = ()=>{
    let allStudents  = [];
    apiData.allReports.map((user)=>{
      let row = Object.values(user).slice(0,3);
      row.push(user.reports.length);
      row.push("www.google.com");
      allStudents.push(row)
    })
    return allStudents;
  }
  studentData = initialStudentsData();
  rawTableData =  (tableData.length==0) ? initialStudentsData() : tableData;
  

  //Quiz List
  apiData.allQuiz.map(quiz=>{
    QuizList.push(quiz.title)
  })
  


   //Search option
   const searchData = (e,viewData,setViewData)=>
      {
        e.preventDefault();

        const searchString = document.getElementById("searchText").value.toString().toLowerCase();
        let resultData = rawTableData.filter(el=>el.join('').toLowerCase().includes(searchString.trim(' ')));
        console.log(resultData);
        //setViewData((searchString.length==0)?rawTableData:resultData);
        setViewData(resultData);

      }

  //sort option
  const sortFunction  = (event)=>{
       let   sortBy   = event.target.value;
       let   sortView = [];
       let   sortArr  = [];
       const index = viewColNames.indexOf(sortBy);

       if(sortBy=='Sort By')
       {
         setViewData(rawTableData)
       }
       else{
         viewData.map(arr=>{
            sortArr.push(arr[index]);
         })
        
         sortArr.sort();
       
         sortArr.map((key)=>{
            viewData.map((arr)=>{
              if(key==arr[index])
              {
                sortView.push(arr);
              }
            })
         })

         setViewData(sortView);
        
       }



  }



  //filter option
  const filterFunction = (event)=>{
     const currentQuiz = event.target.value;
     let cols = [];
     studentData = [];
     let tableColLen = col;
     if(currentQuiz=="All students")
     {  
      studentData = initialStudentsData();
      rawTableData = initialStudentsData();
      cols = studentCol;
     }
     else
     {
          let row = [];
          apiData.allReports.map((user)=>{
              user.reports.map(quiz=>{
              
                if(quiz.id.toLowerCase()==currentQuiz.toLowerCase())
                {
                  row = Object.values(user).slice(0,3);
                  row.push(quiz.score.taken+'/'+quiz.score.total);
                  row.push(quiz.time.taken+'/'+quiz.time.total)
                  row.push("www.google.com");
                  studentData.push(row);
                }
              })
            console.log(studentData);   
          })
          rawTableData = studentData;
          cols = ['Student Name','Rank','Average Score','score','Time Taken']
          tableColLen = cols.length+1;
         
       
      }
      setExportHeader(currentQuiz)
      setTableCol(tableColLen)
      setViewColName(cols)
      setViewData(studentData);
    

      console.log("rawData",rawTableData);

  }

  //Export option
  const exportFile = ()=>{
     let ExportData = []
     if(exportHeader)
     {
       if(exportHeader=="All students")
       {
        const exportStudentCol = ['Student Name','Overall Rank','Average Score','Quizzes Taken']
        apiData.allReports.map((user)=>{
          let row = Object.values(user).slice(0,3);
          row.push(user.reports.length);
          ExportData.push(row)
        })
        ExportData.unshift(exportStudentCol);
       }
       else
       {
        let row = [];
        const exportQuizCol = ['Student Name','Rank','Average Score','score','Time Taken','Status','Questions Left']
        let tagMap = {};
        let runOnce = true;
        apiData.allReports.map((user)=>{
            user.reports.map((quiz)=>{
              console.log(quiz.id);
              console.log(quiz.id.toLowerCase(),exportHeader.toLowerCase());
              if(quiz.id.toLowerCase()==exportHeader.toLowerCase())
              {
                row = Object.values(user).slice(0,3);
                row.push(quiz.score.taken+'/'+quiz.score.total);
                row.push(quiz.time.taken+'/'+quiz.time.total+"Mins");
                row.push(quiz.status);
                row.push(quiz.questionsLeft.length);
                quiz.report.map((tag)=>{
                  if(tag.chapter+'_'+tag.section in tagMap)
                   tagMap[tag.chapter+'_'+tag.section] =  tagMap[tag.chapter+'_'+tag.section] + Number(tag.result);
                  else
                   tagMap[tag.chapter+'_'+tag.section] = Number(tag.result);
                })
                row.push(...Object.keys(tagMap).map(key=>tagMap[key]));

                if(runOnce){
                  exportQuizCol.push(...Object.keys(tagMap).map(key=>key));
                  runOnce=false
                }
        
                tagMap = {};
                ExportData.push(row);
              }
            })
        })
        
        ExportData.unshift(exportQuizCol);
       }

     }
     else
     {
      ExportData.push(viewData);
      ExportData.unshift(viewColNames);
     }

     console.log(ExportData);
 
    let wb = XLSX.utils.book_new();

    wb.Props = {
      Title: exportHeader+"- Reports",
      Subject: exportHeader,
      Author: "MUHI",
      CreatedDate: new Date()
     };
   
     wb.SheetNames.push("Sheet 1");
     let ws_data =  ExportData;  
     let ws = XLSX.utils.aoa_to_sheet(ws_data);
     wb.Sheets["Sheet 1"] = ws;

     let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
      
     function s2ab(s) { 
      let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      let view = new Uint8Array(buf);  //create uint8array as viewer
      for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
      return buf;    
     }
     saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `${exportHeader}-Reports.xlsx`);
  

  }






  const [tableCol ,setTableCol] = React.useState(col);
  const [quizListState,setQuizListState] = React.useState(QuizList)
  const [viewColNames, setViewColName] = React.useState((tableData.length==0) ? studentCol:  colNames)
  const [exportHeader, setExportHeader] = React.useState("All students")
  const [viewData, setViewData] = React.useState((tableData.length==0) ? studentData : tableData)
  


  


  return (
    <div id={style.tableBox}>
      <div className={style.tableFeature}>
        <div id={style.form} style={(feature.search)?({"display" : "inline-block"}) : {"display" : "none"}}>
          <input type="text" id="searchText" onChange={(e) => searchData(e,viewData,setViewData)} placeholder="Search" required/>
          <div className={style.searchBtn} >
            <img src="/imgs/svgs/search.svg" alt="" />
          </div>
        </div>

        <div className="dropDown" style={(feature.sort)?({"display" : "inline-block"}) : {"display" : "none"}}>
          <img src="/imgs/svgs/Sort.svg" alt=""/>
          <select onChange={sortFunction}>
          <option  disabled  defaultValue="Sort By" hidden selected  >Sort By</option>
          <optgroup label="Default View">
             <option value="Sort By" >Sort By</option>
          </optgroup>
          <optgroup label="Sort Options">
              {
               viewColNames.map((option)=>
               <option value={option}>{option}</option>)
              }
          </optgroup>
          </select>
          <span className="dropDrownArrow"></span>
        </div>




        <div className="dropDown" style={(feature.filter)?({"display" : "inline-block"}) : {"display" : "none"}}>
          <img src="/imgs/svgs/Filter.svg" alt=""/>
          <select onChange={filterFunction}>
          <option disabled  defaultValue="filter by" selected hidden >Filter By Quiz</option>
          <optgroup label="Default View">
             <option>All students</option>
          </optgroup>
          <optgroup label="Filter by Quizzes">
             {
               quizListState.map((option)=>
               <option value={option}>{option}</option>)
             }
          </optgroup>
             
            
          </select>
          <span className="dropDrownArrow"></span>
        </div>



        <button id={style.fbtn} onClick={()=>{exportFile(viewData,viewColNames)}} className="greenBtn mt-1" style={(feature.export)?({"display" : "inline-block"}) : {"display" : "none"}}>Export</button>
      </div>

      <div className={style.tableScroll} >
            <ul className={style.table} style={{"--col" : tableCol}}>
                <li id={style.tableHeader} >
                <p>s.no </p>
                    {
                        viewColNames.map(colName=><p>
                           {colName} 
                        </p>)
                    }
                </li>
                {
                (viewData.length==0) ?
                (
                  <li  id={style.noDataBox}>
                    <center>
                      <p>No Data Found</p>
                    </center>
                  </li>
                )
                :(viewData.map((arr,index) =>(
                    <li className={style.row}>
                        <p>{index+1}</p>
                        {
                        arr.slice(0,arr.length-1).map(e=><p>{e}</p>)
                        }
                    <Link href={arr[arr.length-1]} >
                        <a className={buttonColor+"Btn"}>{buttonText}</a>
                    </Link>
                    
                </li>
                )))
                }
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