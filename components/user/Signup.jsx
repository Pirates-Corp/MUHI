import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import style from "../user/Signup.module.scss"

export default function Signup() {
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, isLoading] = useState(false);
    const [user, setUser] = useState(false)

    useEffect(() => {
        // redirect to home if user is authenticated
        if (user) Router.replace("/");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.currentTarget.password.value !== e.currentTarget.cpassword.value) {
            setErrorMsg("Passwords does not match")
        }else{
            setErrorMsg("")
            const body = {
                email: e.currentTarget.email.value,
                name: e.currentTarget.name.value,
                password: e.currentTarget.password.value
            };
            console.log(body)
        }
    };
    return (
        <>
         <div id={style.loginBox}>
        <div id={style.loginInnerBox}>
            <div id={style.header}>
                 <img src="imgs/svgs/MuhiLogo.svg"/>
                 <h3>Create MUHI Account</h3>
            </div>
           
            <form id={style.loginForm} >

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
                    <input type="password"  name="password" placeholder="Password"  required />
                </div>

                <div className="TextBox" id={style.TextBox}>
                    <img src="/imgs/svgs/MobileNumber.svg" alt="password" />
                    <input type="number"  name="mobileNo" placeholder="Mobile Number"  required />
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