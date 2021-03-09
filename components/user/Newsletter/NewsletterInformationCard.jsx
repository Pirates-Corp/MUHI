import PrimaryHeader from "../../common/Header/PrimaryHeading";
import style from "../../user/Newsletter/NewsletterInformationCard.module.scss"
const Newsletter = ()=>{
    return(
        <>
          <PrimaryHeader heading="Newsletters"/>
           <div id={style.newsletterBox}>
            
            <div id={style.newsletter}>
                  <div id={style.headingHolder}>
                      <h1>Life  Of  Muhammad - quiz  | Feb 27 2020</h1>
                  </div>
                  <div id={style.msg}>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas sed enim ut. Bibendum neque egestas congue  quisque egestas diam in. </p>
                  </div>
            </div>
           
            <div id={style.newsletter}>
                  <div id={style.headingHolder}>
                      <h1>Life  Of  Muhammad - quiz  | Feb 27 2020</h1>
                  </div>
                  <div id={style.msg}>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas sed enim ut. Bibendum neque egestas congue  quisque egestas diam in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas sed enim ut. Bibendum neque egestas congue  quisque egestas diam in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas sed enim ut. Bibendum neque egestas congue  quisque egestas diam in. </p>
                  </div>
            </div>


            

           


           </div>
        </>
      
    )
}

export default Newsletter;