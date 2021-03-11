import React from "react";
import style from "../../common/Popups/Snackbar.module.scss";
const Snackbar = (props) => {
const [show, setShow] = React.useState(0);

  const snackBarStyle = {
   "animationName": "fadeInDown",
    "animationDuration": "1s",
    "visibility": "hidden",
  };
  const getTimeout = () => {
    setTimeout(() => {
      setShow(1);
    }, Number(props.time));
  };
  return show == 0 ? (
    <div id={style.snackBox} className={props.color+"Bg"}>
      <p>{props.message}</p>
      {getTimeout()}
    </div>
  ) : (
    <div id={style.snackBox} style={snackBarStyle} >
      <p>{props.message}</p>
      {getTimeout()}
    </div>
  );
};


export default Snackbar;
