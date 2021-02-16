import style from "../../common/Header/GreetingHeader.module.scss";

const GreetingHeader = () => {

  return (
    <div id={style.greetHeader}> 
         <div id={style.roleBox}>
            <p className={style.role}>Admin</p>
        </div>
        <div id={style.greet}> 
            <span className={style.wish}>Good Morning </span>
            <span className={style.user}>Adile </span>
        </div>
       
        <div id={style.quoteBox}>
            <p className={style.quote}>All praise is due to God alone, the Sustainer of all the worlds, - Al-Faatiha</p>
        </div>
    </div>
  )
}

export default GreetingHeader