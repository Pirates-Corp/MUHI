import React from "react";
import style from './UpdateProfile.module.scss'
import PrimaryHeading from "../Header/PrimaryHeading"
import SubHeading from "../Header/SubHeading"

const UpdateProfile = () =>{

    const [userData, setUserData] = React.useState({username: " ",mobile:" "})

    const getDataFromDB = async()=>{
      const result = await fetch("/api/db/user", { method: "GET" });
      const apiData = await result.json();
      return apiData;
    }

    const enableFunction =(e,id)=>
    {
      e.preventDefault();
      let inputFelid =  document.getElementById(id);
      inputFelid.removeAttribute('disabled');
      inputFelid.placeholder = " "
    }

    const updateAccount = async(e)=>{
       e.preventDefault();
      
       let updatedData = {name : e.currentTarget.username.value+"".trim() ,mobileNo: (e.currentTarget.mobile.value+""!=="")? e.currentTarget.mobile.value+"" : "+91 xxxxx xxxxx"}


       let res = await fetch(`/api/db/user/${userData.email}/update`, { method: "PUT" ,
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(updatedData)
       });

       if(res.status == 200)
       {
         document.getElementById('username').disabled = true;
         document.getElementById('mobile').disabled = true;
         const {email,mobileNo, name} = await getDataFromDB(); 
         console.log(name);
         setUserData({email,mobileNo,name});
         alert("Your data has been updated");
       }



    }

    const updatePassword = async(e)=>{
       e.preventDefault();  
       if(e.currentTarget.newPassword.value === e.currentTarget.retypePassword.value )
       {
              let updatedData = { password : e.currentTarget.newPassword.value}

              console.log(updatedData);
              let res = await fetch(`/api/auth/password/update`, { method: "PUT" ,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData)
              });

              if(res.status===200)
              {
                alert("Password Updated successfully ,Login Again");
                window.location.assign('/');
              }
       }
       else
       {
         alert("Passwords don't match")
       }

       
    }

    console.log(userData);


    React.useEffect(async () => {
      const {email,mobileNo, name} = await getDataFromDB(); 
      console.log("From Use Effect ====>",name , email ,mobileNo);
      setUserData({email,mobileNo,name});
    }, []);
  
    



  return(
        <>
        <PrimaryHeading  heading="Profile"/>
        <div id={style.profile}>
          <div className={style.updateAccount}>
          <SubHeading  heading="my Information"/>
            <form id={style.accountForm}  onSubmit={e=>updateAccount(e)}>

                <div className="TextBox">
                  <img src="/imgs/svgs/UserName.svg" alt="username" />
                  <input type="text" id="username" placeholder={userData.username} defaultValue={userData.name}  disabled />
                  <img className="editImg" src="/imgs/svgs/EditOption.svg"  onClick={(e)=>enableFunction(e,"username")} alt="Edit" />
                </div>


                {/* <div className="TextBox">
                  <img src="/imgs/svgs/Email.svg" alt="email"  />
                  <input type="email" placeholder={userData.email} id="email" defaultValue={userData.email}  disabled/>
                  <img className="editImg" src="/imgs/svgs/EditOption.svg"  onClick={(e)=>enableFunction(e,"email")} alt="Edit" />
                </div> */}

                <div className="TextBox">
                  <img src="/imgs/svgs/MobileNumber.svg" alt="Mobile" />
                  <input type="number" id="mobile" placeholder={userData.mobile}  defaultValue={userData.mobileNo} disabled /> 
                  <img className="editImg" src="/imgs/svgs/EditOption.svg"  onClick={(e)=>enableFunction(e,"mobile")} alt="Edit" />
                </div>
                <button type="submit" className="prBtn">Update Profile</button>
            </form>
          </div>
          <div className={style.updatePassword}>

          <SubHeading  heading="Update Password"/>
            <form id={style.passwordForm} onSubmit={e=>updatePassword(e)}>

            {/* <div className="TextBox">
            <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
            <input type="password" id="currentPassword" name="password" placeholder="Current Password" required  />  
            </div> */}


            <div className="TextBox">
            <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
            <input type="password" id="newPassword" name="password" placeholder="New Password" required  />  
            </div>


            <div className="TextBox">
            <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
            <input type="password" id="retypePassword" name="password" placeholder="Re-type Password" required  />  
            </div>

            <button type="submit" className="prBtn">Change Password</button>
            </form>
          </div>
        </div>
        </>
     )
}


export default UpdateProfile;