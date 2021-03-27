import { useRouter } from 'next/router'
import style from "../admin/adminLogin.module.scss";

const Login = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        
        e.preventDefault();

        const body = {
            id: e.currentTarget.id.value,
            password: e.currentTarget.password.value
        };

        console.log(body);

        let res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(res);
        if (res.status === 200) {
           router.push("dashboard")
        } else {
            
        }
    }

  return (
    <div id={style.loginBox} >
        {/* {loading ? "Loading": null} */}
        <div id={style.innerLoginBox}> 
            <div id={style.headingHolder}> 
                <img src="/imgs/svgs/muhiLogo.svg" alt="mugi-logo"/>
                <h1>Admin - Log In</h1>
            </div>
            <form onSubmit={e=>onSubmit(e)}>
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