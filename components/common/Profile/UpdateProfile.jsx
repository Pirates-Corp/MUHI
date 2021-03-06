import React from "react";
import style from '../../common/Profile/UpdateProfile.module.scss'
import PrimaryHeading from "../../common/Header/PrimaryHeading"
import SubHeading from "../../common/Header/SubHeading"

const UpdateProfile = () =>{

    const [userData, setUserData] = React.useState({username: "siva",email:"sivaprakash138@gmail.com",mobile:"5543242"})


    const enableFunction =(e,id)=>
    {
      e.preventDefault();
      let inputFelid =  document.getElementById(id);
      inputFelid.removeAttribute('disabled');
      inputFelid.placeholder = " "
    }

  return(
        <>
        <PrimaryHeading  heading="Profile"/>
        <div id={style.profile}>
          <div className={style.updateAccount}>
          <SubHeading  heading="my Information"/>
            <form id={style.accountForm}>

                <div className="TextBox">
                  <img src="/imgs/svgs/UserName.svg" alt="username" />
                  <input type="text" id="username" placeholder={userData.username}  disabled />
                  <img className="editImg" src="/imgs/svgs/EditOption.svg"  onClick={(e)=>enableFunction(e,"username")} alt="Edit" />
                </div>


                <div className="TextBox">
                  <img src="/imgs/svgs/Email.svg" alt="email"  />
                  <input type="email" placeholder={userData.email} id="email"  disabled/>
                  <img className="editImg" src="/imgs/svgs/EditOption.svg"  onClick={(e)=>enableFunction(e,"email")} alt="Edit" />
                </div>
                <div className="TextBox">
                  <img src="/imgs/svgs/MobileNumber.svg" alt="Mobile" />
                  <input type="number" id="mobile" placeholder={userData.mobile}  disabled /> 
                  <img className="editImg" src="/imgs/svgs/EditOption.svg"  onClick={(e)=>enableFunction(e,"mobile")} alt="Edit" />
                </div>
                <button type="submit" className="prBtn">Update Profile</button>
            </form>
          </div>
          <div className={style.updatePassword}>
          <SubHeading  heading="Update Password"/>
            <form id={style.passwordForm}>
            <div className="TextBox">
            <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
            <input type="password" id="currentPassword" name="password" placeholder="Current Password" required  />  
            </div>


            <div className="TextBox">
            <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
            <input type="password" id="currentPassword" name="password" placeholder="New Password" required  />  
            </div>


            <div className="TextBox">
            <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
            <input type="password" id="currentPassword" name="password" placeholder="Re-type Password" required  />  
            </div>

            <button type="submit" className="prBtn">Change Password</button>
            </form>
          </div>
        </div>
        </>
     )
}


export default UpdateProfile;