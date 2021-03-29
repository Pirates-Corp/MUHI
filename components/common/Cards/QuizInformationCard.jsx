import style from "../../common/Cards/QuizInformationCard.module.scss"
const quizInformationCard = (props) => {

    const { view , apiData } = props;



    const apiFunction =async (e,url,method,body)=> {
        console.log(url,method,body);
        // const res = await fetch(url, {
        //     method,
        //     headers: { "Content-Type": "application/json"},
        //     body
        //     });
    }


     return(
        <>
        <div  id={style.cardHolder}>

        {
            apiData.map((data)=>
            <div id={style.InfoCard} className="mt-3">
            <div id={style.header}>
                <img  src="/imgs/svgs/NameBar.svg"/>
                <h3>{data.quizName}</h3>
            </div>
            <div id={style.body}>

                <div id={style.quizInfo} style={(!view.quizData)? {"display" : "none"} : {}  }>

                    {
                        data.quizData.map((item)=><>
                          <div className={style.quizInfoItem}>
                            <p className={style.infoHeading}>{item.heading}</p>
                            <div className={style.infoDataBox}>
                                <img src={item.icon} />
                                <h5>{item.data}</h5>
                            </div>
                        </div>
                        </>)
                    }
                </div>
               
                <div id={style.tagReport}  style={(!view.tagData)? {"display" : "none"} : {}  }>

                    <div id={style.tagReportHeader}>
                        <h6>Tag Report</h6>
                    </div>

                <div id={style.tagReports}>
                     
                 { (view.tagData) ? (
                   data.tagData.map((tag)=><>
                   <div id={style.report}>
                            <p id={style.sectionName}>{tag.tagname}</p>
                            <h4>{tag.data}</h4>
                        </div>
                   </>)
                  ) : ("") }
                </div>
                </div>

            </div>
    
         <div id={style.footer} style={(!view.showButtons)? {"display" : "none"} : {}  } >
               <button id={style.editBtn} className="greenRoundBtn">
                   <img src="/imgs/svgs/Edit.svg"/>
               </button>
               <button id={style.deleteBtn} onClick={e=>{apiFunction(e,data.buttonData.apiUrl,data.buttonData.reqType,data.buttonData.bodyData)}}  className="redRoundBtn">
                   <img src="/imgs/svgs/Delete.svg"/>
               </button>
            </div> 
        </div>)
        }
        </div>
        
        </>
     )
}

export default quizInformationCard;