import style from "../../common/Cards/OverallRowCards.module.scss"
const OverallRowCard = ( ) =>
{
    return(
        <>
          <div id={style.rowCard}>

           

            <div id={style.rowItem}>
                <div id={style.imgHolder} style={{"background-color" : "var(--secondary)"}}>
                    <img src="/imgs/svgs/Report.svg" alt="report"/>
                </div>
                <div id={style.data}>
                    <p>Number of tests taken</p>
                    <h2>4</h2>
                </div>
            </div>

            <div id={style.rowItem} >
                <div id={style.imgHolder} style={{"background-color" : "var(--red)"}}>
                    <img src="/imgs/svgs/OverallRanking.svg" alt="report"/>
                </div>
                <div id={style.data}>
                    <p>Overall Ranking</p>
                    <h2>2</h2>
                </div>
            </div>

            <div id={style.rowItem} >
                <div id={style.imgHolder} style={{"background-color" : "var(--primary)"}}>
                    <img src="/imgs/svgs/AverageScore.svg" alt="report"/>
                </div>
                <div id={style.data}>
                    <p>Average Score</p>
                    <h2>34</h2>
                </div>
            </div>

            


          </div>
        </>
    )
}

export default OverallRowCard;