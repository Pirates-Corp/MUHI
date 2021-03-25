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
        let resultData = viewData.filter(el=>el.join('').toLowerCase().includes(searchString.trim(' ')));
        console.log(resultData);
        setViewData((searchString.length==0)?rawTableData:resultData);

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
                console.log(quiz.id);
                console.log(currentQuiz);
                console.log(quiz.id.toLowerCase(),currentQuiz.toLowerCase());
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
    

      console.log("studentData",studentData);

  }

  //Export option
  const exportFile = ()=>{
     let ExportAllStudents = []
     if(exportHeader=="All students")
     {
      apiData.allReports.map((user)=>{
        let row = Object.values(user).slice(0,3);
        row.push(user.reports.length);
        
        ExportAllStudents.push(row)
      })
      ExportAllStudents.unshift(studentCol);
    }


    //console.log(JSON.stringify(ExportAllStudents));
    var wb = XLSX.utils.book_new();

    wb.Props = {
      Title: exportHeader+"- Reports",
      Subject: "exportHeader",
      Author: "MUHI",
      CreatedDate: new Date()
     };
   
     wb.SheetNames.push("Sheet 1");
     var ws_data =  ExportAllStudents;  
     var ws = XLSX.utils.aoa_to_sheet(ws_data);
     wb.Sheets["Sheet 1"] = ws;

     var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
      
     function s2ab(s) { 
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf);  //create uint8array as viewer
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
          <select >
             <option  disabled  defaultValue="Sort By" hidden selected  >Sort By</option>
             {
               viewColNames.map((option)=>
                <option value={option}>{option}</option>)
             }
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
