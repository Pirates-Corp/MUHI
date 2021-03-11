import style from "../../common/Cards/QuizInformationCard.module.scss"
const quizInformationCard = ( ) => {
     return(
        <>
        <div id={style.cardHolder}>
          <div id={style.InfoCard}>
            <div id={style.header}>
                <img  src="/imgs/svgs/NameBar.svg"/>
                <h3>Basic of Islam</h3>
            </div>
            <div id={style.body}>

                <div id={style.quizInfo}>

                        <div className={style.quizInfoItem}>
                            <p className={style.infoHeading}>total score</p>
                            <div className={style.infoDataBox}>
                                <img src="/imgs/svgs/TotalScore.svg" />
                                <h5>25/30</h5>
                            </div>
                        </div>

                        <div className={style.quizInfoItem}>
                            <p className={style.infoHeading}>total score</p>
                            <div className={style.infoDataBox}>
                                <img src="/imgs/svgs/TimeTaken.svg" />
                                <h5>25/30</h5>
                            </div>
                        </div>

                        <div className={style.quizInfoItem}>
                            <p className={style.infoHeading}>total score</p>
                            <div className={style.infoDataBox}>
                                <img src="/imgs/svgs/Rank.svg" />
                                <h5>25/30</h5>
                            </div>
                        </div>

                </div>

                <div id={style.tagReport}>

                    <div id={style.tagReportHeader}>
                        <h6>Tag Report</h6>
                    </div>

                    <div id={style.tagReports}>

                        <div id={style.report}>
                            <p id={style.sectionName}>prayer</p>
                            <h4>08/10</h4>
                        </div>
                        <div id={style.report}>
                            <p id={style.sectionName}>prayer</p>
                            <h4>08/10</h4>
                        </div>

                        <div id={style.report}>
                            <p id={style.sectionName}>prayer</p>
                            <h4>08/10</h4>
                        </div>
                        <div id={style.report}>
                            <p id={style.sectionName}>prayer</p>
                            <h4>08/10</h4>
                        </div>

                    </div>
                </div>

            </div>
            <div id={style.footer} >
               <button id={style.editBtn} className="greenRoundBtn">
                   <img src="/imgs/svgs/Edit.svg"/>
               </button>
               <button id={style.deleteBtn}  className="redRoundBtn">
                   <img src="/imgs/svgs/Delete.svg"/>
               </button>
            </div>
        </div>



      
        </div>
        
        </>
     )
}

export default quizInformationCard;