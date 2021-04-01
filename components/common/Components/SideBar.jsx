import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import style from "../../common/Components/SideBar.module.scss";

const adminSideBarItems = [
  {
    id: 1,
    href: "/admin/profile",
    src: "/imgs/svgs/Profile.svg",
    alt: "Profile",
    text: "Profile",
  },
  {
    id: 2,
    href: "/admin/dashboard",
    src: "/imgs/svgs/Home.svg",
    alt: "Home",
    text: "Home",
  },
  {
    id: 3,
    href: "/admin/newsletter",
    src: "/imgs/svgs/Notification.svg",
    alt: "Notification",
    text: "Newsletter Creation",
  },
  {
    id: 4,
    href: "/admin/quiz",
    src: "/imgs/svgs/Quiz.svg",
    alt: "Quiz",
    text: "Quiz",
  },
  {
    id: 5,
    href: "/admin/reports",
    src: "/imgs/svgs/Report.svg",
    alt: "Report",
    text: "Reports",
  },
  {
    id: 6,
    href: "/admin/accounts",
    src: "/imgs/svgs/ManageAccounts.svg",
    alt: "Account-Management",
    text: "Account Management",
  },
];

const userSideBarItems = [
  {
    id: 1,
    href: "/profile",
    src: "/imgs/svgs/Profile.svg",
    alt: "Profile",
    text: "Profile",
  },
  {
    id: 2,
    href: "/dashboard",
    src: "/imgs/svgs/Home.svg",
    alt: "Home",
    text: "Home",
  },
  {
    id: 3,
    href: "/newsletters",
    src: "/imgs/svgs/Notification.svg",
    alt: "Notification",
    text: "Newsletters",
  },
  {
    id: 4,
    href: "/quiz",
    src: "/imgs/svgs/Quiz.svg",
    alt: "Quiz",
    text: "Quiz",
  },
];

let cssStyle = {};

export default function AdminSideBar(props) {
  const router = useRouter();

  const [user] = useContext(AuthContext);

 

    const logout = async (e)=>{
     e.preventDefault();
      let logRes = await fetch("/api/auth/logout",{method: 'PUT'});
      if(logRes.status===200)
      {
          sessionStorage.clear();
          localStorage.clear();
          
          if(user.role === "admin" || user.role === "moderator")
          {
              window.location.href="/admin/login";
          }
          else
          {
              window.location.href="/";
          }
      }

    }
    
    cssStyle = (props.type == "user") ? {"--height" : "32vh","--holder-height":"340px" ,"--background":"#286da9","--activeBackground":"#4ca2ee" }
                                        :{"--height" : "25vh","--holder-height":"460px","--background":"#343131","--activeBackground":"#7a7979" };
    return(
        <div>
            <div id={style.nav} >
                <input id="check-box" className={style.checkBox} type="checkbox" />
                <label htmlFor="check-box" >
                    <div id={style.openMenu}>
                        <img src='/imgs/svgs/OpenMenu.svg' alt="-" />
                    </div>
                </label>
                                            
                <ul id={style.holder} style={cssStyle}>
                  {

                      (props.type == "user")?
                      (userSideBarItems.map((item,index) => (
                        <li key={index} >
                            <Link href={item.href}>
                                <a>
                                    <div className={router.pathname ===  item.href ? `${style.circle}  ${style.active}` : `${style.circle}`}><img src={item.src} alt={item.alt}/></div>
                                    <div className={style.navText}>{item.text}</div>
                                </a> 
                            </Link>
                        </li>
                    ))):
                    (adminSideBarItems.map((item,index) => (
                        <li  key={index} style={ (user) ? ((user.role === "moderator" || user.role === "admin" && item.text ==='Account Management')?{'display' : 'none' }:{'display' : 'block' }): {'display' : 'block' } }>
                            <Link href={item.href}>
                                <a>
                                    <div className={router.pathname ===  item.href ? `${style.circle}  ${style.active}` : `${style.circle}`}><img src={item.src} alt={item.alt}/></div>
                                    <div className={style.navText}>{item.text}</div>
                                </a> 
                            </Link>
                        </li>
                    )))
                  }
          <li>
            <Link href="">
              <a onClick={(e) => logout(e)}>
                <div className={style.circle}>
                  <img src="/imgs/svgs/Logout.svg" alt="logout" />{" "}
                </div>
                <div className={style.navText}>Logout</div>
              </a>
            </Link>
          </li>
          <label id={style.hide} htmlFor="check-box">
            <div id={style.closeMenu}>
              <img src="/imgs/svgs/CloseMenu.svg" alt="-" />
            </div>
          </label>
        </ul>
      </div>
    </div>
  );
}
