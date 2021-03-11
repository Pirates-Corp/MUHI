import React, { useEffect,useState  } from "react"
import style from "../../common/Header/GreetingHeader.module.scss";
 let cssStyle = {};

const GreetingHeader = (props) => {

  let renderWelcomeMsg = (currentTime = new Date()) => {
    const currentHour = currentTime.getHours()
    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening
  
    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      // Between 12 PM and 5PM
      return 'Good afternoon';
    } else if (currentHour >= splitEvening ||  currentHour <= 3) {
      // Between 5PM and Midnight
      return 'Good evening';
    }
    // Between dawn and noon
    return 'Good morning';
  }






  console.log(props);
  cssStyle = (props.for == "user") ?
               {  
                 "background" : "var(--adminColor)"
               }:
               {
                 "background" : "var(--userColor)"
               }

 
  const [userData, setUserData] = useState();

  
  useEffect(async () => {
    // const result = await fetch("/api/db/user", { method: "GET" });
    // await result.json();
    const data = {
      name : "Afzal",
      role : "Admin"
    }
    setUserData(data)
  }, []);

  
    


  return (
    <div id={style.greetHeader} style={cssStyle} > 
        {userData ? (
          <>
           { 
              (!(props.for == "user"))?
              (
              <div id={style.roleBox}>
              <p className={style.role}>{userData.role}</p>
              </div>
              )
              :" "
           }
            <div id={style.greet}> 
                <span className={style.wish}>{renderWelcomeMsg()} </span>
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