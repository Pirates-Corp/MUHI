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
    <div > 
        <div > 
            <div> 
                <img src="" alt="logo"/>
                <h1>MUHI Admin | LOG IN</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <img src="" alt="logo" />
                    <input type="text" name="username" ref={register({ required: true })} />
                    {errors.username && <span>This field is required</span>}
                </div>
                <div>
                    <img src="" alt="logo" />
                    <input type="text" name="password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                </div>
                <input type="submit"/>
            </form>
        </div>
    </div>
  )
}

export default Login