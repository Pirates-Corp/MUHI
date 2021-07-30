import { useRouter  } from 'next/router'
import Link from "next/link"
import Head from "next/head"
import style from "../admin/adminLogin.module.scss";
import { useEffect , useState} from 'react';
import Snackbar from '../../components/common/Popups/Snackbar'


const Login = () => {

    const router = useRouter();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [openSnackbar, setOpenSnackbar]= useState(true);

   

    // const onSubmit = async (e) => {
        
    //     e.preventDefault();

    //     const body = {
    //         id: e.currentTarget.id.value,
    //         password: e.currentTarget.password.value
    //     };

    //     console.log(body);

    //     let res = await fetch("/api/auth/login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(body)
    //     });
    //     console.log(res);
    //     if (res.status === 200) {
    //        router.push("dashboard")
    //     } else {
            
    //     }
    // }

    useEffect(()=>{
        if(router.asPath === "/admin/login?incorrect")
        {
            setMessage("Incorrect Admin Username / Password");
            setColor("red");
            setOpenSnackbar(true);
            router.push('/admin/login')
        }
    },[])

    const goHome = (e)=>{
        e.preventDefault();
        window.location.assign('/');
    }


  return (
    <>
    <Head>
        <title>Admin Login</title>
    </Head>
    <div id={style.loginBox} >
        <div id={style.innerLoginBox}> 
            <div id={style.headingHolder}> 
                <img src="/imgs/svgs/muhiLogo.svg" alt="mugi-logo"/>
                <h1>Admin - Log In</h1>
            </div>
            <form action="/api/auth/login" method="POST" >
              
                <div className="TextBox">
                    <img src="/imgs/svgs/UserName.svg" alt="username" />
                    <input type="text" id="id" name="id" placeholder="Username" title="Email Id's and Moderator Login Not Allowed" pattern="[a-zA-Z0-9]+"  required />
                </div>
                <div className="TextBox">
                    <img src="/imgs/svgs/CurrentPassword.svg" alt="password" />
                    <input type="password" id="password" name="password" placeholder="Password" required  />                   
                </div>
                
                <input className="prBtn" type="submit" value="Login"/>
            </form>
           
                <span onClick={e=>goHome(e)} className={style.studentLogin}>Go to Student Login</span>
         
        </div>
     </div>
     <Snackbar 
          message={message} 
          time="4000" color={color} 
          open={openSnackbar} 
          setOpen={setOpenSnackbar}
    />
    </>
  )
}

export default Login