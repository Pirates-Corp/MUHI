import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'

import style from "../admin/Login.module.scss";

const Login = ({loading, setLoading}) => {
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter()

    const onSubmit = async (e) => {
        console.log("data", e);
        //TODO:Submit the form

        // router.push('/admin/dashboard');
    }

  return (
    <div id={style.loginBox} > 
        <div id={style.innerLoginBox}> 
            <div id={style.headingHolder}> 
                <img src="/imgs/svgs/muhiLogo.svg" alt="mugi-logo"/>
                <h1>Admin - Log In</h1>
            </div>
            <form action='/api/auth/login' method='POST' onSubmit={(e) => onSubmit(e)}>
                <div className="TextBox">
                    <img src="/imgs/svgs/UserName.svg" alt="username" />
                    <input type="text" name="id" placeholder="Username"  required />
                   
                </div>
                <div className="TextBox">
                    <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                    <input type="password" name="password" placeholder="Password" required  />
                    <input type="hidden" name='role' value='admin'/>
                </div>
                <input className="prBtn" type="submit" value="Login"/>
            </form>
        </div>
    </div>
  )
}

export default Login