import React from 'react';
import Link from "next/link"
import { useRouter } from "next/router";

import style from "../admin/AdminSideBar.module.scss"

const sideBarItems = [
    {id : 1, href: "profile", src: "/imgs/svgs/Profile.svg", alt: "Profile", text: "Profile"},
    {id : 2, href: "dashboard", src: "/imgs/svgs/Home.svg", alt: "Home", text: "Home"},
    {id : 3, href: "newsletter", src: "/imgs/svgs/Notification.svg", alt: "Notification", text: "Newsletter Creation"},
    {id : 4, href: "quiz", src: "/imgs/svgs/Quiz.svg", alt: "Quiz", text: "Quiz"},
    {id : 5, href: "reports", src: "/imgs/svgs/Report.svg", alt: "Report", text: "Reports"},
    {id : 6, href: "accounts", src: "/imgs/svgs/ManageAccounts.svg", alt: "Account-Management", text: "Account Management"},
]

export default function AdminSideBar(){
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'PUT',
        });
    };

    return(
        <div>
            <div id={style.nav} >
                <input id="check-box" className={style.checkBox} type="checkbox" />
                <label htmlFor="check-box" >
                    <div id={style.openMenu}>
                        <img src='/imgs/svgs/OpenMenu.svg' alt="-" />
                    </div>
                </label>
                
                <ul id={style.holder}>
                    {sideBarItems.map((item) => (
                        <li>
                            <Link href={item.href}>
                                <a>
                                    <div className={router.pathname === '/admin/' + item.href ? `${style.circle}  ${style.active}` : `${style.circle}`}><img src={item.src} alt={item.alt}/></div>
                                    <div className={style.navText}>{item.text}</div>
                                </a> 
                            </Link>
                        </li>   
                    ))}
                    <li>
                        <Link href="/admin/login">
                            <a onClick={handleLogout}>
                                <div className={style.circle}><img src="/imgs/svgs/Logout.svg" alt="Logout"/></div>
                                <div className={style.navText}>Logout</div>
                            </a> 
                        </Link>
                    </li>
                    <label id={style.hide} htmlFor="check-box">
                        <div id={style.closeMenu}>
                            <img src='/imgs/svgs/CloseMenu.svg' alt="-" />
                        </div>
                    </label>
                </ul>
            </div>
        </div>
    )
}