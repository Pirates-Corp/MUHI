import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import  OpenQuizAlert  from '../../common/Components/OpenQuizAlert'
import style from "../../user/Quiz/QuizTaking.module.scss";

const Timer = ({ props }) => {
  const router = useRouter();

  const [currentCount, setCount] = useState(props.currentQuiz.duration );

  console.log("time in seconds =>",currentCount);

  const [minute, setMinute] = useState(parseInt(Math.ceil(currentCount / 60)));

  const [second, setSecond] = useState(parseInt(Math.ceil(currentCount % 60)));

  const [started, setStarted] = useState( (JSON.parse(localStorage.getItem('startedVal'))==0) ? JSON.parse(localStorage.getItem('startedVal')) : -1);

  if (started === -1) {
    

    if(router.pathname.startsWith('/openquiz'))
    {
          if(props.currentQuiz.duration != null) {
            props.currentQuiz.totalDuration = props.currentQuiz.duration;
           
            if (started) {
              localStorage.setItem('startedVal', JSON.stringify(-1))
            } 
          } 
          else {
            router.push("/openquiz");
          }
    }
    else
    {
        if(props.currentQuiz.duration != null) {
          props.currentQuiz.totalDuration = props.currentQuiz.duration;
          const isStarted = confirm(
            "Quiz is about to start. Kindly click ok to start"
          );
          if (isStarted) {
            setStarted(0);
            localStorage.setItem('startedVal', JSON.stringify(0))
          } else {
            router.push("/quiz");
        
          }
        } 
        else {
          router.push("/quiz");
   
        }
    }

  }

  useEffect(() => {

    if (started === 0 && props.currentQuiz.status!==1) {
      const id = setInterval(() => {
        if(currentCount>0) setCount(currentCount - 1);
        if (currentCount === 0) {
          console.log('Quiz ended');
          props.currentQuiz.duration = 0
          props.currentQuiz.status = 1;
          props.endQuiz()
        }
      }, 1000);
      // if (props.currentQuiz && minute > parseInt(Math.ceil(currentCount / 60))) {
      props.currentQuiz.status = 0;
      props.currentQuiz.duration = currentCount;
      // console.log(props.currentQuiz.duration);
      props.setCurrentQuiz({ ...props.currentQuiz });
      // }
      setMinute(parseInt(Math.floor(currentCount / 60))) 
      setSecond(parseInt(Math.floor(currentCount % 60)))
      return () => clearInterval(id);

    }
  }, [currentCount,started]);

  return (
    <>
      <div name="timer" id={style.timer}>
        <img src="/imgs/svgs/TimeTaken.svg" alt="Time :" />
        <p id={style.time}>
          <span name="timeInMinutes">{minute}</span>:{" "}
          <span name="timeInSeconds">{second}</span>
        </p>
      </div>
      {
        (started==-1 && router.pathname.startsWith('/openquiz') ) ?
        (<OpenQuizAlert  props={{started,setStarted}}/>):
        ""
      }
    </>
  );
};

export default Timer;
