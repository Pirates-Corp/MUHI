import React, { useEffect,useState  } from "react"
import style from "../../common/Header/GreetingHeader.module.scss";

const GreetingHeader = () => {
  const [userData, setUserData] = useState();

  useEffect(async () => {
    const result = await fetch("/api/db/user", { method: "GET" });
    const data = await result.json();
    setUserData(data)
  }, []);

  return (
    <div id={style.greetHeader}> 
        {userData ? (
          <>
            <div id={style.roleBox}>
                <p className={style.role}>{userData.role}</p>
            </div>
            <div id={style.greet}> 
                <span className={style.wish}>Good Morning </span>
                <span className={style.user}>{userData.name}</span>
            </div>
            <div id={style.quoteBox}>
                <p className={style.quote}>All praise is due to God alone, the Sustainer of all the worlds, - Al-Faatiha</p>
            </div>
          </>
          ): ("loading")
        }
    </div>
  )
}

export default GreetingHeader