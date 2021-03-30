import React from "react";
import style from './UpdateProfile.module.scss'
import PrimaryHeading from "../Header/PrimaryHeading"
import SubHeading from "../Header/SubHeading"

const UpdateProfile = () =>{

    const [userData, setUserData] = React.useState({username: " ",mobile:" "})


    const enableFunction =(e,id)=>
    {
      e.preventDefault();
      let inputFelid =  document.getElementById(id);
      inputFelid.removeAttribute('disabled');
      inputFelid.placeholder = " "
    }

    const updateAccount = async(e)=>{
       e.preventDefault();
       console.log(userData.email);
       let updatedData = {name : e.currentTarget.username.value+"" ,mobileNo: e.currentTarget.mobile.value+""}
       console.log(updatedData);

       let res = await fetch(`/api/db/user/${userData.email}/update`, { method: "PUT" ,
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(updatedData)
       });

      //  if(res.status)
      //  {
      //    alert("Your data has been updated")
      //  }



    }

    const updatePassword = (e)=>{
       e.preventDefault();
       let updatePassword = {password: e.currentTarget.currentPassword.value, newPassword:e.currentTarget.newPassword.value, reNewPassword: e.currentTarget.retypePassword.value}
      
      
       if(updatePassword.newPassword === updatePassword.reNewPassword )
       {
            
       }
       else
       {
         alert("Passwords don't match")
       }

       console.log(updatePassword);
    }

    console.log(userData);


    React.useEffect(async () => {
      const result = await fetch("/api/db/user", { method: "GET" });
      const userData = await result.json();
      const {email,mobileNo, name} = userData;
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
            <div className="TextBox">
            <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
            <input type="password" id="currentPassword" name="password" placeholder="Current Password" required  />  
            </div>


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