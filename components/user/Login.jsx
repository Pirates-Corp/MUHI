import React from "react"
import Link from "next/link";
import style from "../user/Login.module.scss";
import { useRouter } from 'next/router'
import Snackbar from '../../components/common/Popups/Snackbar'
export default function Login() {

  const router = useRouter();

  // const [err,errShow] = React.useState(1);
   

  //   if(router.asPath === "/?incorrect") {
  //     errShow(0);  
  //   }  
   

  return (
    <>
    
      <div id={style.loginBox}>
        <div id={style.loginInnerBox}>
          <div id={style.header}>
            <img src="imgs/svgs/muhiLogo.svg" />
            <h3>Student Login</h3>
          </div>

          <form id={style.loginForm} action="/api/auth/login" method="POST">
            <div className="TextBox" id={style.TextBox}>
              <img src="/imgs/svgs/UserName.svg" alt="email" />
              <input type="email" name="id" placeholder="E - mail" required />
            </div>

            <div className="TextBox" id={style.TextBox}>
              <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div id={style.btnHolder}>
              <input className="prBtn" type="submit" value="Login" />
              <Link href="/forgetpassword">
                <a className={style.forgetPassword}>Forgot Password</a>
              </Link>
            </div>
          </form>

          <div id={style.otherOptions}>

            {/* <button className="blueBtn" id={style.gBtn}>
              <img src="imgs/svgs/Google.svg" />
              Continue with Google
            </button> */}

            <p>Don't have an account ? </p>
            <Link href="/signup">
              <a className={style.forgetPassword} id={style.signUp}>
                Sign up
              </a>
            </Link>

            <div id={style.line}></div>
            <Link href="/openquiz">
              <a id={style.opBtn} className="prBtn">
                Take Quizz without Login
              </a>
            </Link>
          </div>
        </div>
      </div>
      {(router.asPath === "/?incorrect") ?

         (
           <Snackbar message="Invalid Email or Password" color="red" time="4000" />
          //  (errShow(1))
         )
        
         : ("")}
    </>
  );
}
