import Link from "next/link";
import style from "../Components/OpenQuizAlert.module.scss";
const OpenQuizAlert = ({props}) => {

  const closAlert = (e)=>{
    e.preventDefault();
    localStorage.setItem('startedVal', JSON.stringify(0))
    props.setStarted(0);
  }

  const collectOpenQuizStudentData = (e)=>{
    e.preventDefault();
    const studentname = e.currentTarget.name.value
    const studentGender = (document.getElementsByName('gender')[0].checked) ? ("male") : ("female")
    const student = {
      name : studentname,
      gender : studentGender
    }
    localStorage.setItem("Student",JSON.stringify(student))
    localStorage.setItem('startedVal', JSON.stringify(0))
    props.setStarted(0);
  }

  return (
    <>
      <div id={style.window}>
        <div id={style.box}>
          <button className="redRoundBtn" onClick={e=>closAlert(e)} id={style.closeBtn}>
            <img src="/imgs/svgs/CloseMenu.svg" alt="close" />
          </button>
          <div id={style.header}>
            <img src="/imgs/svgs/MuhiLogoSm.svg" alt="muhiLogo" />
            <h4>MUHI Quiz</h4>
          </div>
          <form id={style.main} onSubmit={e=>collectOpenQuizStudentData(e)}>
            <div className="TextBox" id={style.TextBox}>
              <img src="/imgs/svgs/UserName.svg" alt="user" />
              <input type="text" name="name" placeholder="Your name" required />
            </div>

            <label id={style.radio} className="radio">
              <input type="radio" value="male" name="gender" />
              <span className="inputControl"></span>
              Male
            </label>
            <label id={style.radio} className="radio">
              <input type="radio" value="female"  name="gender" />
              <span className="inputControl"></span>
              Female
            </label>

            <div id={style.btnHolder}>
              <button id={style.startBtn}  type="submit" className="prBtn">
                Start
              </button>
              <button  onClick={e=>closAlert(e)} id={style.skip}>Skip {">>"}</button>
            </div>
          </form>
          <div id={style.footer}>
            <p>
              Or Create MUHI account -
              <Link href="/signup">
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
