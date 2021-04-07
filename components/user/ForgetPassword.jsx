import { route } from "next/dist/next-server/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../user/Login.module.scss";
const ForgetPassword = () => {
  const router = useRouter();

  //console.log((router.pathname.startsWith('/forgetpassword/reset_password')));

  console.log(router.query.token);

  const sentLink = async (e) => {
    e.preventDefault();
    const body = {
      id: e.currentTarget.id.value.toLowerCase().trim(),
    };

    const res = await fetch("/api/auth/password/forgot", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      alert(`Password Reset Link Sent to ${body.id}`);
    }
  };

  const updatePassword = async (e)=>{
    e.preventDefault();

    if(e.currentTarget.newPassword.value === e.currentTarget.retypePassword.value)
    {
        const body = {
            token : router.query.token,
            password  : e.currentTarget.newPassword.value
        }

        const res =  await  fetch("/api/auth/password/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if(res.status == 200)
          {
            alert("Password updated")
            router.push('/')
          }
          else
          {
            alert("Something Went wrong");
          }
     }
     else
     {
       alert("Password doesn't Match");
     }


  }

  return (
    <>
      <div id={style.loginBox}>
        <div id={style.loginInnerBox}>
          <div id={style.header}>
            <h3>{(router.query.token)? "Create New Password" : "Forget Password"}</h3>
          </div>

          {router.query.token ? (
            <form id={style.loginForm} onSubmit={e=>updatePassword(e)}>
              <div className="TextBox" id={style.TextBox}>
                <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="TextBox" id={style.TextBox}>
                <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                <input
                  type="password"
                  name="retypePassword"
                  placeholder="Re-type Password"
                  required
                />
              </div>
              <div id={style.btnHolder}>
                <input
                  className="prBtn"
                  type="submit"
                  value="Change Password"
                />
              </div>
            </form>
          ) : (
            <form id={style.loginForm} onSubmit={(e) => sentLink(e)}>
              <div className="TextBox" id={style.TextBox}>
                <img src="/imgs/svgs/UserName.svg" alt="email" />
                <input type="email" name="id" placeholder="E - mail" required />
              </div>
              <div id={style.btnHolder}>
                <input
                  className="prBtn"
                  type="submit"
                  value="Send Reset Link"
                />
              </div>
            </form>
          )}

          <div id={style.otherOptions}>
            <p>Remember your Password? </p>
            <Link href="/">
              <a className={style.forgetPassword} id={style.signUp}>
                Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
