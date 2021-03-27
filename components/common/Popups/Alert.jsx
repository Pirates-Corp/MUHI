import React from "react";
import style from "../../common/Popups/Alert.module.scss";
const Alert = (props) => {
const [show, setShow] = React.useState(0);
  return (
    <>
        <div id={style.window}>
            <div id={style.confirmationDiv}>
              <p id="confirmText">Are you sure, Want to quit?</p>
              <div id={style.alterBtnHolder}>
                    <button id={style.yes} className="greenBtn">Yes</button>
                    <button id={style.no} className="redBtn">No</button>
              </div>
            </div>
        </div>
    </>
  )
};


export default Alert;