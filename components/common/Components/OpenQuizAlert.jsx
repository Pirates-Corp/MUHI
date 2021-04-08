import Link from "next/link";
import style from "../Components/OpenQuizAlert.module.scss";
const OpenQuizAlert = () => {
  return (
    <>
      <div id={style.window}>
        <div id={style.box}>
          <button className="redRoundBtn" id={style.closeBtn}>
            <img src="imgs/svgs/CloseMenu.svg" alt="close" />
          </button>
          <div id={style.header}>
            <img src="/imgs/svgs/MuhiLogoSm.svg" alt="muhiLogo" />
            <h4>MUHI Quiz</h4>
          </div>
          <form id={style.main}>
            <div className="TextBox" id={style.TextBox}>
              <img src="/imgs/svgs/UserName.svg" alt="user" />
              <input type="text" name="name" placeholder="Your name" required />
            </div>

            <label id={style.radio} className="radio">
              <input type="radio" name="gender" />
              <span className="inputControl"></span>
              Male
            </label>
            <label id={style.radio} className="radio">
              <input type="radio" name="gender" />
              <span className="inputControl"></span>
              Female
            </label>

            <div id={style.btnHolder}>
              <button id={style.startBtn} type="submit" className="prBtn">
                Start
              </button>
              <button id={style.skip}>Skip {">>"}</button>
            </div>
          </form>
          <div id={style.footer}>
            <p>
              Or Create MUHI account -
              <Link href="signup">
                <a> Sign up</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenQuizAlert;
