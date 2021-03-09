import PrimaryHeading from "../../common/Header/PrimaryHeading";
import Link from "next/link"
import style from "../../user/Quiz/QuizTaking.module.scss";
const QuizTaking = () => {
  return (
    <>
      <div id={style.takeQuizBox}>
        <PrimaryHeading heading="Basic of Islam" />
        <div id={style.timer}>
          <img src="/imgs/svgs/TimeTaken.svg" alt="Time :" />
          <p id={style.time}><span>01</span>: <span>30</span></p>
        </div>
        <div id={style.quiz}>
          <div id={style.questionBox}>
              <div id={style.questionHolder}>
                  <p id={style.question}>
                      11 . Which Sahabah was replaced with Bilal (r.a) as the caller of
                      Prayer?
                     
                    </p>

                    <div id={style.options}>
                        <label className="radio" id={style.radio}>
                        <input type="radio" name="option"  />
                        <span className="inputControl"  id={style.inputControl} ></span>
                        Sa'd ibn Malik
                        </label>
                        <label className="radio" id={style.radio}>
                        <input type="radio" name="option"  />
                        <span className="inputControl"  id={style.inputControl}></span>
                        Sa'd ibn ar-Rabi
                        </label>
                        <label className="radio" id={style.radio}>
                        <input type="radio" name="option"  />
                        <span className="inputControl" id={style.inputControl}></span>
                        Said ibn Jazied
                        </label>
                        <label className="radio" id={style.radio}>
                        <input type="radio" name="option"  />
                        <span className="inputControl" id={style.inputControl}></span>
                        Sa'd Al-Quraz
                        </label>
                    </div>
              </div>
              <div id={style.navOptions}>
                <button className="blueBtn" id={style.pre}>
                previous
                </button>
                <button className="blueBtn" id={style.nxt}>
                    Next
                </button>
            </div>
          </div>
         
          <div id={style.questionSet}>

            <div className={style.scrollView}>
            <ul id={style.roundList}>
                    <li><button className={`${style.qNav} ${style.active}`}>1</button></li>
                    <li><button className={`${style.qNav} ${style.answered}`}>2</button></li>
                    <li><button className={`${style.qNav} ${style.answered}`}>3</button></li>
                    <li><button className={style.qNav}>4</button></li>
                    <li><button className={style.qNav}>5</button></li>
                    <li><button className={style.qNav}>6</button></li>
                    <li><button className={style.qNav}>7</button></li>
                    <li><button className={style.qNav}>8</button></li>
                    <li><button className={style.qNav}>9</button></li>
                    <li><button className={style.qNav}>10</button></li>
                    <li><button className={style.qNav}>11</button></li>
                    <li><button className={style.qNav}>12</button></li> 
                    <li><button className={style.qNav}>13</button></li>
                    <li><button className={style.qNav}>14</button></li>
                    <li><button className={style.qNav}>15</button></li>
                    
                    
                </ul>
             </div>

            {/* <button id={style.exitBtn} className="redBtn">
             End Quiz
            </button> */}

            <Link href="congratulations">
                <a  id={style.exitBtn} className="redBtn">End Quiz</a>
            </Link>
            
                
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizTaking;
