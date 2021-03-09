import Link from "next/link";
import style from "../user/Signup.module.scss"

export default function Signup() {
   
    return (
        <>
         <div id={style.loginBox}>
        <div id={style.loginInnerBox}>
            <div id={style.header}>
                 <img src="imgs/svgs/muhiLogo.svg"/>
                 <h3>Create MUHI Account</h3>
            </div>
           
            <form id={style.loginForm}   action="/api/auth/signup" method="POST">

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

                <input  type="text" name="role" value="user" hidden/>

                <div className="TextBox" id={style.TextBox}>
                    <img src="/imgs/svgs/MobileNumber.svg" alt="password" />
                    <input type="number"  name="mobileNo" placeholder="Mobile Number"  minLength='5' required />
                </div>

                <div id={style.btnHolder}>
                     <input className="prBtn" type="submit" onSubmit={e=>{handleSubmit(e)}} value="Sign Up"/>
                </div>

             </form>
             
             <div id={style.otherOptions}>

             <div id={style.line}></div>  
                <button className="blueBtn" id={style.gBtn}>
                    <img src="imgs/svgs/Google.svg"/>
                    Start with Google
                </button>

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