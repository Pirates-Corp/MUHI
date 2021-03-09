import React, {useState} from 'react';

import style from "../admin/adminLogin.module.scss";

const Login = () => {
    // const [loading, isLoading] = useState(false);
    // const [errorMsg, setErrorMsg] = useState("");

    // const onSubmit = async (e) => {
    //     isLoading(true);
    //     e.preventDefault();

    //     const body = {
    //         id: e.currentTarget.username.value,
    //         password: e.currentTarget.password.value
    //     };

    //     await fetch("/api/auth/login", {
    //         method: "POST",
    //         redirect : "follow",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(body)
    //     });

    //     // if (res.status === 200) {
    //     //     alert("logged in")
    //     // } else {
    //     //     isLoading(false);
    //     //     setErrorMsg("Incorrect username or password. Try again!");
    //     // }
    // }

  return (
    <div id={style.loginBox} >
        {/* {loading ? "Loading": null} */}
        <div id={style.innerLoginBox}> 
            <div id={style.headingHolder}> 
                <img src="/imgs/svgs/muhiLogo.svg" alt="mugi-logo"/>
                <h1>Admin - Log In</h1>
            </div>
            <form  action="/api/auth/login" method="POST" >
                {/* {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null} */}
                <div className="TextBox">
                    <img src="/imgs/svgs/UserName.svg" alt="username" />
                    <input type="text" id="id" name="id" placeholder="Username"  required />
                </div>
                <div className="TextBox">
                    <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                    <input type="password" id="password" name="password" placeholder="Password" required  />                   
                </div>
                <input className="prBtn" type="submit" value="Login"/>
            </form>
        </div>
    </div>
  )
}

export default Login