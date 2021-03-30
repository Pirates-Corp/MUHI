import style from "../../common/Cards/QuizInformationCard.module.scss"
const quizInformationCard = (props) => {

    const { view , apiData } = props;



    const apiDeleteFunction = async(e,url,method,body,action)=>{
        console.log(url,method,body,action);


        if("deleteReport"===action)
        {
            //let r = confirm('');
            const res = await fetch(`/api/db/report/${body.userId}/reports/${body.quizId}/remove`, {
                method : 'DELETE',
                headers: { "Content-Type": "application/json"},
                });
        }

    }


    

    const apiEditFunction = async(e,url,method,body,action)=>{
        console.log(url,method,body,action);
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
               <button style={(!data.buttonData.edit)? {"display" : "none"}  : {} } id={style.editBtn} onClick={e=>{apiEditFunction(e,data.buttonData.apiUrl,data.buttonData.reqType,data.buttonData.bodyData,data.buttonData.editAction)}}  className="greenRoundBtn">
                   <img src="/imgs/svgs/Edit.svg"/>
               </button>
               <button style={(!data.buttonData.delete)?{"display" : "none"}  : {} } id={style.deleteBtn} onClick={e=>{apiDeleteFunction(e,data.buttonData.apiUrl,data.buttonData.reqType,data.buttonData.bodyData,data.buttonData.deleteAction)}}  className="redRoundBtn">
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