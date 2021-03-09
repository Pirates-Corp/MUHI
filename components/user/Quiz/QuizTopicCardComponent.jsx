import Link from "next/link";
import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from '../../user/Quiz/QuizTopicCardComponent.module.scss';

const  QuizTopicCardComponent = () =>
{
    return(
      <>
      <PrimaryHeader heading="MUHI Quiz" />

      <div id={style.quizCardsHolder}>

        <div className={style.quizCard}>
          <h2>Basic Of Islam</h2>
          <ul>
            <li><img src="imgs/svgs/TimeW.svg" alt=""/><p>30 Mins</p></li>
            <li><img src="imgs/svgs/FileW.svg" alt=""/><p>30 Questions</p></li>
            <li><img src="imgs/svgs/EndDateW.svg" alt=""/><p>End Date : 27 feb 2021</p></li>
          </ul>
          <div id={style.quizBtnHolder}>
          {/* <button className={style.quizBtn}>Take Quiz</button> */}
          <Link href="quiz/takequiz">
                <a className={style.quizBtn}>Take Quiz</a>
          </Link>
          </div>
        </div>


        
        <div className={style.quizCard}>
          <h2>Basic Of Islam</h2>
          <ul>
            <li><img src="imgs/svgs/TimeW.svg" alt=""/><p>30 Mins</p></li>
            <li><img src="imgs/svgs/FileW.svg" alt=""/><p>30 Questions</p></li>
            <li><img src="imgs/svgs/EndDateW.svg" alt=""/><p>End Date : 27 feb 2021</p></li>
          </ul>
          <div id={style.quizBtnHolder}>
          {/* <button className={style.quizBtn}>Take Quiz</button> */}
          <Link href="quiz/takequiz">
                <a className={style.quizBtn}>Take Quiz</a>
          </Link>
          </div>
        </div>


       
     
     

      </div>
      </>
      


    )
}


export default  QuizTopicCardComponent;