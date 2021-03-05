import React from "react";
import style from "../../common/Popups/Snackbar.module.scss";
const Snackbar = (props) => {



  const [show, setShow] = React.useState(0);

  const snackBoxStye = {
    transition: "2s",
    visibility: "hidden",
  };

  const getTimeout = () => {
    setTimeout(() => {
      setShow(1);
    }, Number(props.time));
  };

  return show == 0 ? (
    <div id={style.snackBox} >
      <p>{props.message + show}</p>
      {getTimeout()}
    </div>
  ) : (
    <div style={snackBoxStye} id={style.snackBox}>
      <p>{props.message + show}</p>
      {getTimeout()}
    </div>
  );
};
//Nikhil.sachdeva0401@gmail.com/8010666820

export default Snackbar;
