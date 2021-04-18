import React, { useState } from "react";
import style from "../../common/Popups/Snackbar.module.scss";

const snackVisible = {
  "animation-name": "fadeInUp",
  "animation-duration": "1s",
  "visibility": "visible",
 };
 const snackHidden = {
  "animation-name": "fadeInDown",
  "animation-duration": "1s",
  "visibility": "hidden",
 };
const Snackbar = (props) => {

  const [snackBarStyle, setSnackbarStyle] = useState(snackVisible);
  React.useEffect(()=>{
    setSnackbarStyle(snackVisible)
  },[props.open])
  
  const getTimeout = () => {
    if(props.open){
      setTimeout(() => {
        setSnackbarStyle(snackHidden);
        props.setOpen(false)
      }, props.time);
    }
  };

  return  (
    <>
      <div id={style.snackBox} className={props.color+"Bg"} style={snackBarStyle} >
        <p>{props.message}</p>
      </div>
      {getTimeout()}
    </>

  )
};


export default Snackbar;
