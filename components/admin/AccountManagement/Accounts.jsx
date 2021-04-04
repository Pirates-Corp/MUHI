import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import PrimaryHeading from '../../common/Header/PrimaryHeading'
import TableComponent from "../Table/TableComponent";
export default function Accounts() {


const [data,setData] = useState([
  ['loading..',"loading..","loading..","loading..","loading..","loading.."],
])
 
const router = useRouter();


useEffect(async()=>{
  let  allUsers = [];
  let userData = [];
  
  const userRes = await fetch('http://localhost:3000/api/db/user/all', {
    method: "GET",
    headers: { "Content-Type": "application/json"},
  });
  allUsers = await userRes.json();
  
  

  
  function formatTime(timeCreated) {
    var periods = {
      month: 30 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000
    };
    var diff = Date.now() - timeCreated;
  
    if (diff > periods.month) {
      // it was at least a month ago
      return Math.floor(diff / periods.month) + "m";
    } else if (diff > periods.week) {
      return Math.floor(diff / periods.week) + "w";
    } else if (diff > periods.day) {
      return Math.floor(diff / periods.day) + "d";
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + "h";
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + "m";
    }
    return "Just now";
  }
 

  allUsers.map(user=>
  {

    if(router.pathname==="/admin/accounts/students")
    {
          if(user.role=="user")
          {
          const {_id,name,email,mobileNo,lastLogin,state} = user;
          let row = [];
          row.push(name);
          row.push(email);
          row.push(mobileNo);
          row.push(formatTime(lastLogin));
          row.push(state.split('').map((e,index)=>index==0 ? e.toUpperCase(): e).join(''))
          row.push( (state.toLowerCase()=='active') ? `/api/db/user/${_id}/disable` : `/api/db/user/${_id}/enable-suspend`)
          userData.push(row);
        }
    }
    else
    {
      if(user.role=="moderator")
          {
          const {_id,name,email,mobileNo,lastLogin,state} = user;
          let row = [];
          row.push(name);
          row.push(email);
          row.push(mobileNo);
          row.push(formatTime(lastLogin));
          row.push(state.split('').map((e,index)=>index==0 ? e.toUpperCase(): e).join(''))
          row.push( (state.toLowerCase()=='active') ? `/api/db/user/${_id}/disable` : `/api/db/user/${_id}/enable-suspend`)
          userData.push(row);
        }
    }
     


  })
  console.log(router.pathname);
      setData(userData)
      console.log("userData",userData);
},[])
      

    
     console.log("data==>",data)


  return(
    <>
      <PrimaryHeading heading={(router.pathname==="/admin/accounts/students")?"Students Report":"Moderators"}/>
      <TableComponent
          col="6"
          colNames={['Student Name','Email','Phone','Last Active','Status']}
          buttonColor="red"
          buttonText="Suspend"
          tableData={data}
          apiData={{}}
          feature={{
            search : true,
            sort : false,
            filter : false,
            export : true
          }}
        />
    </>
  )
}