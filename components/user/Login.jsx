import React,{useContext, useEffect } from "react"
import Link from "next/link";
import style from "../user/Login.module.scss";
import { useRouter } from 'next/router'
import {AuthContext} from '../context/AuthContext'
//import {OAuth2Client} from 'google-auth-library';
// import Snackbar from '../../components/common/Popups/Snackbar'
export default function Login() {

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


  if(router.asPath === "/?incorrect")
  {
    alert("Incorrect Email / Password");
    window.location.assign('/');
  }


  const googleLogin = async(googleUser)=>{
    // console.log(googleUser.tc);
    // var id_token = googleUser.getAuthResponse().id_token;
    //     console.log("ID Token: " + id_token);
    const body = {

      
      id : googleUser.getBasicProfile().getEmail(),
      password :  googleUser.getBasicProfile().getEmail() + "MUHI",
     
     }
     console.log(body);
     fetch('/api/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'      
      },
      redirect: 'follow',
      body : JSON.stringify(body)
    }).then(res=>{
      if(res.status==400)
      { 
        alert("User Doesn't Exist")
      }
      else
      {
        console.log(res);
       window.location.assign(res.url);
      }
    })  


  }


  useEffect(()=>{
    if(window)
    {
     const script = document.createElement('script');
     script.setAttribute( 'src', "https://apis.google.com/js/platform.js" );
     script.async = true
     script.defer = true
     document.body.appendChild(script);

     if(window.gapi){
       gapi.load('auth2', function()
       {
         // Retrieve the singleton for the GoogleAuth library and set up the client.
        let  auth2 = gapi.auth2.init({
           client_id: '268288424375-nqcjflopnej8ihc781orbprr9rjdg0ii.apps.googleusercontent.com',
           cookiepolicy: 'single_host_origin',
           // Request scopes in addition to 'profile' and 'email'
           //scope: 'additional_scope'
         });
         attachSignin(document.getElementById('gBtn'),auth2);
       });
     };
   
     function attachSignin(element, auth2) {
       auth2.attachClickHandler(element, {},
           function(googleUser) {
             googleLogin(googleUser);
           }, function(error) {
             console.log("Error====>"+JSON.stringify(error));
           });
      }

    }
  })


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
          
             <button className="blueBtn"  id="gBtn">
              <img src="imgs/svgs/Google.svg" />
              Continue with Google
            </button>

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
     
         
    </>
  );
}
