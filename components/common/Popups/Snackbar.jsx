import React from "react";
import style from "../../common/Popups/Snackbar.module.scss";
const Snackbar = (props) => {
const [show, setShow] = React.useState(0);

  const snackBoxStye = {
   "animation-name": "fadeInDown",
    "animation-duration": "0.5s",
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
    <div style={snackBoxStye} id={style.snackBox}>
      <p>{props.message}</p>
      {getTimeout()}
    </div>
  );
};


export default Snackbar;
