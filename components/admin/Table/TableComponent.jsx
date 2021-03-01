import React from "react";
import style from "../../admin/Table/TableComponent.module.scss";
import Link from "next/link";

let rawData ;


const searchData = (e,data,setData)=>
{

  e.preventDefault();
  const searchString = document.getElementById("searchText").value.toString().toLowerCase();
  let resultData = data.filter(el=>el.join('').toLowerCase().includes(searchString.trim(' ')));
  console.log(resultData);
  setData((searchString.length==0)?rawData:resultData);
  
}



const TableComponent = (props) => {
  
  const [data, setData] = React.useState(props.data)
  
  rawData = props.data;

  return (
    <div id={style.tableBox}>
      <div className={style.tableFeature}>
        <div id={style.form}>
          <input type="text" id="searchText" onChange={(e) => searchData(e,data,setData)} placeholder="Search" required/>
          <div className={style.searchBtn} >
            <img src="/imgs/svgs/search.svg" alt="" />
          </div>
        </div>
        <button id={style.fbtn} className="greenBtn mt-1">Sort</button>
      </div>

      <div className={style.tableScroll} >
            <ul className={style.table} style={{"--col" : props.col}}>
                <li id={style.tableHeader} >
                <p>s.no</p>
                    {
                        props.colNames.map(colName=><p>
                           {colName} 
                        </p>)
                    }
                </li>
                {
                (data.length==0) ?
                (
                  <li  id={style.noDataBox}>
                    <center>
                      <p>No Data Found</p>
                    </center>
                    </li>
                )
                :(data.map((arr,index) =>(
                    <li className={style.row}>
                        <p>{index+1}</p>
                        {
                        arr.slice(0,arr.length-1).map(e=><p>{e}</p>)
                        }
                    <Link href={arr[arr.length-1]} >
                        <a className={props.buttonColor+"Btn"}>{props.buttonText}</a>
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
