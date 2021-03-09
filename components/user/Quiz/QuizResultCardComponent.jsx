import Link from "next/link"
import style from "../../user/Quiz/QuizResultCardComponent.module.scss"
const QuizResultCard = () =>
{
   return(
       <>
       <div id={style.conCard}>

                <div className={style.header}>
                    <h1>Congratulations 🎉</h1>
                </div>

                <div id={style.msg}>
                <p>We have sent you the syllabus as a mail to <Link href="#"><a>Mohamad@gamil.com</a></Link></p>
                </div>

               <div id={style.syllabus}>
                    <h4>Syllabus List</h4>
                    <div id={style.syllabusScroll}> 
                        <ul id={style.syllabusList}>
                            <li><p>Mohamad - Personal Life</p><Link href="http://www.google.com"><a className="blueBtn" >Open </a></Link></li>
                            <li><p>Mohamad - Personal Life</p><Link href="http://www.google.com"><a className="blueBtn" >Open </a></Link></li>
                            <li><p>Mohamad - Personal Life</p><Link href="http://www.google.com"><a className="blueBtn" >Open </a></Link></li>
                            <li><p>Mohamad - Personal Life</p><Link href="http://www.google.com"><a className="blueBtn" >Open </a></Link></li>
                            <li><p>Mohamad - Personal Life</p><Link href="http://www.google.com"><a className="blueBtn" >Open </a></Link></li>
                        </ul>
                    </div>
                </div>

                <div id={style.footer}>
                    <div id={style.markHolder}>
                        <p>Your Score</p>
                        <h1 id={style.mark}>23/30</h1>
                    </div>
                    <div id={style.btnHolder}>
                        <Link href="/dashboard">
                            <a className="redBtn">Close</a>
                        </Link>
                    </div>
                </div>
       </div>
       </>
   )
}

export default QuizResultCard;