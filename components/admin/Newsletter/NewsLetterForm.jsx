import React, {useState} from "react"
import { Router, useRouter } from 'next/router'

import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from "../../admin/Newsletter/NewsLetterForm.module.scss";
import Snackbar from '../../common/Popups/Snackbar.jsx'

const NewsLetterForm = () => {
  const router = useRouter();

  const [isActive, setIsActive] = useState(true);
  const [selectedOption, setSelectedOption] = useState("postNow");

  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [openSnackbar, setOpenSnackbar]= useState(false);

  const currentTime =
    new Date().toISOString().split(":")[0] +
    ":" +
    new Date().toISOString().split(":")[1];

    const onSubmit = async (e) => {
        e.preventDefault();

        const body = {
            title: e.currentTarget.title.value,
            content: e.currentTarget.content.value,
            state: isActive ? "active": "inActive",
            schedule: {
              startTime: Date.parse(e.currentTarget.startDate.value),
              endTime: Date.parse(e.currentTarget.endDate.value)
            }
        };
        let res = await fetch("/api/db/newsletter/add", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if(res.status === 201){
          setMessage("Succesfully created newsletter");
          setColor("green");
          setOpenSnackbar(true);
          setTimeout(() => {
            router.push("/admin/newsletter");
          }, 1500);
        } else if(res.status === 409){
          setMessage("The newsletter already exists!");
          setColor("red");
          setOpenSnackbar(true);
          
        }
    }

  return (
    <>
      <PrimaryHeader  heading="Create Newsletter" />
        <form className={style.newsletterForm} onSubmit={e=>onSubmit(e)} >
          <div id={style.fromBox}>
            <input
              id={style.newsletterName}
              type="text"
              className="textBox"
              name="title"
              placeholder="Newsletter Name "
              required
            />
            <textarea className="textBox mt-1" placeholder="Newsletter Content" name="content" required/>
          </div>
          <div id={style.options}>
            <label class="container" id={style.checkbox}>
              Active
              <input 
                type="checkbox" 
                name="state" 
                checked={isActive} 
                onChange={() => setIsActive(!isActive)} 
              />
              <span class="checkmark"></span>
            </label>

            <label id={style.radio} className="radio">
              <input type="radio" name="postNow" checked={selectedOption === "postNow" } onChange={(e) => setSelectedOption("postNow")}   />
              <span className="inputControl"></span>
              Post Now
            </label>

            <label id={style.schedule} className="radio">
              <input type="radio" name="scheduleLater" checked={selectedOption==="scheduleLater"}  onChange={(e) => setSelectedOption("scheduleLater")} />
              <span className="inputControl"></span>
              Schedule later
            </label>

            <div className="TextBox" id={style.Textbox}>
              <img src="/imgs/svgs/StartDate.svg" alt="date" />
              <input
                disabled={selectedOption === "postNow"}
                type="datetime-local"
                min={currentTime}
                id="startDate"
                name="startDate"
                defaultValue={selectedOption === "postNow" && currentTime}
                onChange={(e) => {
                  document.getElementById("endDate").min = e.target.value;
                }}
                placeholder="Start Date"
                required
              />
            </div>

            <div className="TextBox" id={style.Textbox}>
              <img src="/imgs/svgs/EndDate.svg" alt="date" />
              <input
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
        <Snackbar 
          message={message} 
          time="4000" color={color} 
          open={openSnackbar} 
          setOpen={setOpenSnackbar}
        />
    </>
  );
};

export default NewsLetterForm;
