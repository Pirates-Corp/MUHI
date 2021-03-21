import { useState, useEffect } from "react";
import style from "../../user/Quiz/QuizTaking.module.scss";


const Timer = ({props}) => {

    const [currentCount, setCount] = useState(parseInt(props.duration*60));

    const [minute, setMinute] = useState(parseInt(Math.floor(currentCount/60)));

    const [second, setSecond] = useState(parseInt(Math.floor(currentCount%60)));

    useEffect(
        () => {
            if (currentCount <= 0) {
                return;
            }
            const id = setInterval(()=>{setCount(currentCount-1)}, 1000);
            if(props.currentQuiz && minute > parseInt(Math.floor(currentCount/60))) {
                props.currentQuiz.duration = parseInt((currentCount)/60)
                console.log(props.currentQuiz.duration);
                props.setCurrentQuiz({...props.currentQuiz})
            }
            setMinute(parseInt(Math.floor(currentCount/60)))
            setSecond(parseInt(Math.floor(currentCount%60)))
            return () => clearInterval(id);
        },
        [currentCount]
    );

  return (
    <>
      <div name="timer" id={style.timer}>
        <img src="/imgs/svgs/TimeTaken.svg" alt="Time :" />
        <p id={style.time}>
          <span name="timeInMinutes">{minute}</span>:{" "}
          <span name="timeInSeconds">{second}</span>
        </p>
      </div>
    </>
  );
};

export default Timer;
