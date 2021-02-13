import Head from 'next/head'
import Link from "next/link"
import style from "../admin/AdminSideBar.module.scss"
export default function AdminSideBar()
{
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
         
               <li>
                     <Link href="/about"> 
                       <a> 
                           <div className={`${style.circle} ${style.active}`}><img src='/imgs/svgs/Profile.svg' alt='profile'/></div>
                           <div className={style.navText}>profile</div>
                       </a>
                    </Link>
                </li>

                <li> 
                    <Link href="/home"> 
                    <a>
                         <div className={`${style.circle}`}><img src='/imgs/svgs/Home.svg' alt='Home'/></div>
                         <div className={style.navText}> Home</div>
                    </a>   
                    </Link>
               </li> 

               <li>
                     <Link href="/newsletter-creation" >
                         <a>
                            <div className={`${style.circle} `}><img src='/imgs/svgs/Notification.svg' alt='Notification'/></div> 
                            <div className={style.navText}> Newsletter Creation</div>
                         </a> 
                      </Link>
                </li>
                <li> 
                    <Link href="/quiz" >
                        <a>
                           <div className={`${style.circle} `}><img src='/imgs/svgs/Quiz.svg' alt='Quiz'/></div>
                           <div className={style.navText}>Quiz Creation</div>
                        </a> 
                    </Link>
                </li>
                <li> 
                    <Link href="/report" >
                        <a>
                            <div className={`${style.circle} `}><img src='/imgs/svgs/Report.svg' alt='Report'/></div>
                            <div className={style.navText}>Students Report</div>
                        </a> 
                    </Link>
                </li>
                <li>
                    <Link href="/management" >
                        <a>
                            <div className={`${style.circle}` }><img src='/imgs/svgs/ManageAccounts.svg' alt='Account-Management'/></div>
                            <div className={style.navText}> Account Management</div>
                        </a> 
                    </Link>
                </li>

                <li> 
                    <Link href="/logout" >
                        <a>
                            <div className={`${style.circle} `} ><img src='/imgs/svgs/Logout.svg' alt='Log out'/></div>
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