import Link from "next/link";
import PrimaryHeading from "../../common/Header/PrimaryHeading";
import style from "../../../components/admin/Newsletter/AdminNewsleterCard.module.scss"

const AdminNewsLetterCard = () => {
  return (
    <>
      <PrimaryHeading heading="newsletters" />
      <Link href="newsletter/newsletterfrom">
        <a className="blueBtn">
          <img className="mt-1" src="/imgs/svgs/OptionPlus.svg"></img>
          Create
        </a>
      </Link>
      <div id={style.scrollView}>


        <div id={style.newLetterCard}>
          <p id={style.status} className={style.inactive}>inActive</p>

          <div id={style.contentBox}>
            <h3 id={style.newsLetterHeading}>Life Of Muhammad - quiz | Feb 27 2020</h3>
            <p id={style.newsLetterContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam
              maecenas sed enim ut. Bibendum neque egestas congue quisque
              egestas diam in.
            </p>
          </div>
          <div id={style.newsLetterBtnHolder}>
          <button className="greenRoundBtn" id={style.editBtn}><img src="/imgs/svgs/Edit.svg" alt="edit"/></button>  
             <button className="redRoundBtn" id={style.deleteBtn}><img src="/imgs/svgs/Delete.svg" alt="edit"/></button> 
          </div>
        </div>


        <div id={style.newLetterCard}>
          <p id={style.status}  className={style.active}>Active</p>

          <div id={style.contentBox}>
            <h3 id={style.newsLetterHeading}>Life Of Muhammad - quiz | Feb 27 2020</h3>
            <p id={style.newsLetterContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam
              maecenas sed enim ut. Bibendum neque egestas congue quisque
              egestas diam in.
            </p>
          </div>
          <div id={style.newsLetterBtnHolder}>
             <button className="greenRoundBtn" id={style.editBtn}><img src="/imgs/svgs/Edit.svg" alt="edit"/></button>  
             <button className="redRoundBtn" id={style.deleteBtn}><img src="/imgs/svgs/Delete.svg" alt="edit"/></button>    
          </div>
        </div>




        <div id={style.newLetterCard}>
          <p id={style.status}  className={style.active}>Active</p>

          <div id={style.contentBox}>
            <h3 id={style.newsLetterHeading}>Life Of Muhammad - quiz | Feb 27 2020</h3>
            <p id={style.newsLetterContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam
              maecenas sed enim ut. Bibendum neque egestas congue quisque
              egestas diam in.
            </p>
          </div>
          <div id={style.newsLetterBtnHolder}>
             <button className="greenRoundBtn" id={style.editBtn}><img src="/imgs/svgs/Edit.svg" alt="edit"/></button>  
             <button className="redRoundBtn" id={style.deleteBtn}><img src="/imgs/svgs/Delete.svg" alt="edit"/></button>    
          </div>
        </div>



      </div>
    </>
  );
};

export default AdminNewsLetterCard;
