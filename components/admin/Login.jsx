import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'

import style from "../admin/Login.module.scss";

const Login = ({loading, setLoading}) => {
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter()

    const onSubmit = async (data, e) => {
        console.log("data", data);
        //TODO:Submit the form

        router.push('/admin/dashboard');
    }

  return (
    <div id={style.loginBox} > 
        <div id={style.innerLoginBox}> 
            <div id={style.headingHolder}> 
                <img src="/imgs/svgs/muhiLogo.svg" alt="mugi-logo"/>
                <h1>Admin - Log In</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="TextBox">
                    <img src="/imgs/svgs/UserName.svg" alt="username" />
                    <input type="text" name="username" placeholder="Username"  required />
                   
                </div>
                <div className="TextBox">
                    <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                    <input type="password" name="password" placeholder="Password" required  />
                    
                </div>
                <input className="prBtn" type="submit" value="Login"/>
            </form>
        </div>
    </div>
  )
}

export default Login