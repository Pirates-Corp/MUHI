import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "../../user/Quiz/QuizTaking.module.scss";

const Timer = ({ props }) => {
  const router = useRouter();

  const [currentCount, setCount] = useState(
    parseInt(props.currentQuiz.duration)
  );

  console.log("time in seconds =>",currentCount);

  const [minute, setMinute] = useState(parseInt(Math.ceil(currentCount / 60)));

  const [second, setSecond] = useState(parseInt(Math.ceil(currentCount % 60)));

  const [started, setStarted] = useState(-1);

  if (started === -1) {
    props.currentQuiz.totalDuration = props.currentQuiz.duration;
    const isStarted = confirm(
      "Quiz is about to start. Kindly click ok to start"
    );
    if (isStarted) {
      setStarted(0);
    } else {
      router.push("/quiz/congratulations");
    }
  }


  console.log(props.currentQuiz.totalDuration);

  useEffect(() => {
    if (started === 0) {
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
  }, [currentCount]);

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
