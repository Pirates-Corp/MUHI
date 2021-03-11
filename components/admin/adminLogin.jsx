import React from "react";
import { useRouter } from 'next/router'
import style from "../admin/adminLogin.module.scss";
import Snackbar from '../../components/common/Popups/Snackbar'

const Login = () => {
  let [err, setErr] = React.useState(0);
  const router = useRouter();

  const doLogin = async (e) => {
    e.preventDefault();
    const body = {
      id: e.currentTarget.id.value,
      password: e.currentTarget.password.value,
    };
    let res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status == 400 && body.id == "afzal" && body.password == "demo123" ) {
      router.push("/admin/dashboard");
    } else {
      setErr(1);
    }
  };
  // action="/api/auth/login" method="POST"
  return (
    <>
      <div id={style.loginBox}>
        <div id={style.innerLoginBox}>
          <div id={style.headingHolder}>
            <img src="/imgs/svgs/muhiLogo.svg" alt="mugi-logo" />
            <h1>Admin - Log In</h1>
          </div>
          <form   onSubmit={e=>doLogin(e)}>
            <div className="TextBox">
              <img src="/imgs/svgs/UserName.svg" alt="username" />
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Username"
                required
              />
            </div>
            <div className="TextBox">
              <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <input
              className="prBtn"
              type="submit"
            
              value="Login"
            />
          </form>
        </div>
      </div>
      {err == 1 ? (
        <Snackbar message="Invalid Email or Password" color="red" time="4000" />
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
