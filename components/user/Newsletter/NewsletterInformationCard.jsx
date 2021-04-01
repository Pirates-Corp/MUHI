import { useEffect, useState } from "react";
import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from "../../user/Newsletter/NewsletterInformationCard.module.scss";

const Newsletter = () => {
  const [NewsLetters, setNewsLetters] = useState([]);

  useEffect(async () => {
    const res = await fetch("/api/db/newsletter/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    let allNewsletters = await res.json();

    const ActiveNewsLetter = [];

    allNewsletters.map((newsletter) => {
      if (String(newsletter.state).toLowerCase() === "active") {
        if ((newsletter.schedule.startTime < Date.now() && newsletter.schedule.endTime> Date.now()) || (newsletter.schedule.startTime === 0  && newsletter.schedule.endTime === 0) )
         {
          ActiveNewsLetter.push(newsletter);
        }
      }
    });

    setNewsLetters(ActiveNewsLetter);
  },[]);

  return (
    <>
      <PrimaryHeader heading="Newsletters" />
      <div id={style.newsletterBox}>
        {NewsLetters.length !== 0 ? (
          <>
            {NewsLetters.map((newsletter) => (
              <>
                <div id={style.newsletter}>
                  <div id={style.headingHolder}>
                    <h1>{newsletter.title}</h1>
                  </div>
                  <div id={style.msg}>
                    <p>
                     {newsletter.content}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </>
        ) : (
          <><p>No NewLetters to Show</p></>
        )}
      </div>
    </>
  );
};

export default Newsletter;
