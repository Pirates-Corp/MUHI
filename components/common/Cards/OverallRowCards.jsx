import style from "../../common/Cards/OverallRowCards.module.scss"
const OverallRowCard = (props) =>
{

    return(
        <>
          <div id={style.rowCard}>

            {
              props.data.map(item=>
                <div id={style.rowItem}>
                <div id={style.imgHolder} style={{"background-color" : `var(--${item.color})`}}>
                    <img src={`${item.imgScr}`} alt={`${item.dataHeading}`}/>
                </div>
                <div id={style.data}>
                    <p>{`${item.dataHeading} `}</p>
                    <h2>{`${item.data}`}</h2>
                </div>
               </div>
              )
              
            }

          </div>
        </>
    )
}

export default OverallRowCard;