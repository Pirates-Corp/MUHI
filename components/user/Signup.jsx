import Link from "next/link";
import {useContext} from 'react'
import { useRouter } from 'next/router'
import {AuthContext} from '../context/AuthContext'
import style from "../user/Signup.module.scss"

export default function Signup() {

    const router = useRouter();

    const [user] = useContext(AuthContext);

    if(user!==null)
    {
      if(user.role=="user")
      {
         router.push('/dashboard')
      }
      if(user.role=="admin" || user.role=="moderator")
      {
        router.push('/admin/dashboard')
      }
    }
  



   const doSignUp = async (e) =>{
       
    e.preventDefault();
     
    const body = {
            name : e.currentTarget.name.value,
            password : e.currentTarget.password.value,
            email : e.currentTarget.email.value,
            mobileNo : e.currentTarget.mobileNo.value,
            role: e.currentTarget.role.value,
            accountType : e.currentTarget.accountType.value,
        }
    
       const res =  await fetch('api/auth/signup',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'      
        },
        redirect: 'follow',
        body : JSON.stringify(body)
      })
      console.log(res);
  
      if(res.status==409)
      { 
        alert("User Already Exist")
      }
      if(res.status==401)
      { 
        alert("Something went wrong , Try again")
      }
      else
      {
       window.location.assign(res.url);
      }
   }

   //action="/api/auth/signup" method="PUT"
   
    return (
        <>
         <div id={style.loginBox}>
        <div id={style.loginInnerBox}>
            <div id={style.header}>
                 <img src="imgs/svgs/muhiLogo.svg"/>
                 <h3>Create MUHI Account</h3>
            </div>
           
            <form id={style.loginForm} onSubmit={e=>{doSignUp(e)}} >

                <div className="TextBox" id={style.TextBox}>
                    <img src="/imgs/svgs/UserName.svg" alt="user" />
                    <input type="text"  name="name" placeholder="username"  required />
                </div>

                <div className="TextBox" id={style.TextBox}>
                    <img src="/imgs/svgs/Email.svg" alt="email" />
                    <input type="email"  name="email" placeholder="E - mail"  required />
                </div>

                <div className="TextBox" id={style.TextBox}>
                    <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                    <input type="password"  name="password" placeholder="Password"  minLength='6' required />
                </div>

                <input  type="text" name="role" defaultValue="user" hidden/>
                <input  type="text" name="accountType" defaultValue="muhi" hidden/>

                <div className="TextBox" id={style.TextBox}>
                    <img src="/imgs/svgs/MobileNumber.svg" alt="password" />
                    <input type="number"  name="mobileNo" placeholder="Mobile Number"  minLength='5' required />
                </div>

                <div id={style.btnHolder}>
                     <input className="prBtn" type="submit"  value="Sign Up"/>
                </div>

             </form>
             
             <div id={style.otherOptions}>

             <div id={style.line}></div>  
                {/* <button className="blueBtn" id={style.gBtn}>
                    <img src="imgs/svgs/Google.svg"/>
                    Start with Google
                </button> */}

                <p>Already have an account ? </p> 
                <Link href="/">
                    <a className={style.forgetPassword} id={style.signUp}>Login </a>
                </Link>
             </div>

        </div>
      </div>
        </>
    );
}