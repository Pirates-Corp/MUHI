import React, {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import PrimaryHeading from "../../common/Header/PrimaryHeading";
import style from "../../../components/admin/Newsletter/AdminNewsleterCard.module.scss"
import Snackbar from '../../common/Popups/Snackbar.jsx'

const AdminNewsLetterCard = () => {
  const router = useRouter();

    const [newsletters, setNewsLetters ] = useState([]);

    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [openSnackbar, setOpenSnackbar]= useState(false);

    const getNewsletters = async() => {

        let res = await fetch("/api/db/newsletter/all", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let result = await res.json()
        setNewsLetters(result)
    }

    useEffect(()=>{
      getNewsletters()
    }, [])

    const handleEditNewsLetter = (id) =>{
      const newsLetterToEdit = newsletters.find((x) => x._id === id);
    
      router.push({
        pathname: '/admin/newsletter/newsletterfrom',
        query: { data: JSON.stringify(newsLetterToEdit)}
      })
    }

    const handleDeleteNewsletter = async (id) =>{

      let res = await fetch(`/api/db/newsletter/${id}/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Successfully deleted");
      setColor("green");
      setOpenSnackbar(true)
      //! instead of doing GET request, return all data from db after delete operation
      getNewsletters();    
    }

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

          {newsletters && newsletters.map(newsletter=>
            <div id={style.newLetterCard}>
              <p id={style.status} className={newsletter.state ==="active" ? style.active : style.inactive}>
                  {newsletter.state === "active" ? "Active": "Not active"}
                </p>
              <div id={style.contentBox}>
                <h3 id={style.newsLetterHeading}>{newsletter.title} | { new Date(newsletter.schedule.startTime).toDateString()}</h3>
                <p id={style.newsLetterContent}>
                    {newsletter.content}
                </p>
              </div>
              <div id={style.newsLetterBtnHolder}>
                  <button className="greenRoundBtn" id={style.editBtn} onClick={()=>handleEditNewsLetter(newsletter._id)}><img src="/imgs/svgs/Edit.svg" alt="edit"/></button>  
                  <button className="redRoundBtn" id={style.deleteBtn} onClick={()=>handleDeleteNewsletter(newsletter._id)}><img src="/imgs/svgs/Delete.svg" alt="edit"/></button> 
              </div>
            </div>
          )}
          <Snackbar 
            message={message} 
            time="4000" color={color} 
            open={openSnackbar} 
            setOpen={setOpenSnackbar}
          />
       
      </div>
    </>
  );
};

export default AdminNewsLetterCard;
