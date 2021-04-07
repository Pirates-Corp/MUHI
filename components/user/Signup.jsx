import Link from "next/link";
import {useContext, useEffect, useState} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
//import GoogleAuth from 'google-auth-library';
import {AuthContext} from '../context/AuthContext'

import style from "../user/Signup.module.scss"

export default function Signup() {

    const router = useRouter();

    const [user] = useContext(AuthContext);

    const [googleUser , setGoogleUser] = useState('No User');

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

   
   

function googleSignUp(googleUser) {
    const body = {
      name : googleUser.getBasicProfile().getName(),
      email : googleUser.getBasicProfile().getEmail(),
      role: 'user',
      accountType : 'google',
     }
 
    console.log(body);

    fetch('api/auth/signup',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'      
      },
      redirect: 'follow',
      body : JSON.stringify(body)
    }).then(res=>{
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
        console.log(res);
       //window.location.assign(res.url);
      }
    })  
  }
  


  // function attachSignin(element,auth2) {
  //   console.log(element.id);
  //   auth2.attachClickHandler(element, {},
  //       function(googleUser) {
  //          console.log(googleUser.getBasicProfile().getName());
  //       }, function(error) {
  //         alert(JSON.stringify(error, undefined, 2));
  //       });
  // }

  

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
              googleSignUp(googleUser);
            }, function(error) {
            });
       }

     }
   })

 
    return (
        <>
        <Head>
        <title>Sign Up - MUHI</title>
      </Head>
         <div id={style.loginBox}>
        <div id={style.loginInnerBox}>
            <div id={style.header}>
                 <img src="imgs/svgs/muhiLogo.svg"/>
                 <h3>Create MUHI Account </h3>
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
           

                <button  id="gBtn" className="blueBtn" >
                <img src="imgs/svgs/Google.svg"/>
                    Start with Google
                </button>

                {/* <div className="g-signin2" dataOnsuccess={onSignIn}></div> */}

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