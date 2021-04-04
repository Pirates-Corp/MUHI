import Link from 'next/link'
import PrimaryHeading from '../../../components/common/Header/PrimaryHeading';
import SubHeading from '../../common/Header/SubHeading';
import style from "../../admin/AccountManagement/ManageAccounts.module.scss";

const ManageAccounts = () =>{

    async  function handleSubmit(e)
    {
        e.preventDefault();
        const body = {
                name : e.currentTarget.name.value,
                password : e.currentTarget.password.value,
                email : e.currentTarget.email.value,
                mobileNo : e.currentTarget.mobileNo.value,
                role: e.currentTarget.role.value,
                accountType : e.currentTarget.accountType.value,
            }
            const res =  await fetch('/api/auth/signup',{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'      
                },
                body : JSON.stringify(body)
              })

              
            if(res.status==409)
            { 
                alert("Moderator Already Exist");

            }
            else if(res.status==201)
            {
                
                alert("Moderator Created Successfully");
                Object.keys(body).splice(0,4).map(id=>{
                    document.getElementById(id).value = "";
                })
            }
            else
            {
                alert("Something went Wrong, Try again later");
                
            }
    }

    return(
        <> 
        <PrimaryHeading heading="Account Management"/>
        <div id={style.ManagementBox}>
            <div id={style.CreateModerator}>
                <SubHeading heading="Create Moderator"/>
                <form id={style.createForm} onSubmit={e=>{handleSubmit(e)}}  >

                    <div className="TextBox" id={style.TextBox}>
                        <img src="/imgs/svgs/UserName.svg" alt="user" />
                        <input type="text" id="name"  name="name" placeholder="username"  required />
                    </div>

                    <div className="TextBox" id={style.TextBox}>
                        <img src="/imgs/svgs/Email.svg" alt="email" />
                        <input type="email" id="email"  name="email" placeholder="E - mail"  required />
                    </div>

                    <div className="TextBox" id={style.TextBox}>
                        <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                        <input type="password" id="password" name="password" placeholder="Password"    minLength='6' required />
                    </div>

                    <input  type="text" name="role" value="moderator" hidden/>
                    <input  type="text" id="accountType" name="accountType" value="muhi" hidden/>
              

                    <div className="TextBox" id={style.TextBox}>
                        <img src="/imgs/svgs/MobileNumber.svg" alt="password" />
                        <input type="number" id="mobileNo"  name="mobileNo" placeholder="Mobile Number" minLength='5' required />
                    </div>

                    <div id={style.btnHolder}>
                        <input className="prBtn" type="submit" value="Create"/>
                    </div>

               </form>
            </div>
            <div id={style.Manage}>
                <SubHeading heading="Manage"/>
                <div id={style.ManageBtnHolder}>
                    <Link href="accounts/students">
                       <a className="blueBtn">Students Account</a>
                    </Link>
                    <Link href="accounts/moderators">
                       <a className="greenBtn">Moderators Account</a>
                    </Link>
                </div>
                
            </div>
        </div>
        
        </>
    )
}

export default ManageAccounts;