import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from "../../admin/Newsletter/NewsLetterForm.module.scss";
const NewsLetterForm = () => {
  const currentTime =
    new Date().toISOString().split(":")[0] +
    ":" +
    new Date().toISOString().split(":")[1];

  return (
    <>
      <PrimaryHeader  heading="Create Newsletter" />
      <form className={style.newsletterForm}>
        <div id={style.fromBox}>
          <input
            id={style.newsletterName}
            type="text"
            className="textBox"
            placeholder="Newsletter Name "
            required
          />
          <textarea className="textBox mt-1" placeholder="Newsletter Content"   required/>
        </div>
        <div id={style.options}>
          <label class="container" id={style.checkbox}>
            Active
            <input type="checkbox"  />
            <span class="checkmark"></span>
          </label>

          <label id={style.radio} className="radio">
            <input type="radio" name="type" checked />
            <span className="inputControl"></span>
            Post Now
          </label>

          <label id={style.schedule} className="radio">
            <input type="radio" name="type" checked />
            <span className="inputControl"></span>
            Schedule later
          </label>

          <div className="TextBox" id={style.Textbox}>
            <img src="/imgs/svgs/StartDate.svg" alt="date" />
            <input
              type="datetime-local"
              min={currentTime}
              id="startDate"
              name="startDate"
              onChange={(e) => {
                document.getElementById("endDate").min = e.target.value;
                document.getElementById("endDate").removeAttribute("disabled");
              }}
              placeholder="Start Date"
              required
            />
          </div>

          <div className="TextBox" id={style.Textbox}>
            <img src="/imgs/svgs/EndDate.svg" alt="date" />
            <input
              disabled
              type="datetime-local"
              min={currentTime}
              onChange={(e) => {
                document.getElementById("startDate").max = e.target.value;
              }}
              id="endDate"
              name="endDate"
              placeholder="end Date"
              required
            />
            
          </div>
          <input id={style.pubBtn} type="submit" className="prBtn" value="Publish"/>
        </div>
       
      </form>
    </>
  );
};

export default NewsLetterForm;
