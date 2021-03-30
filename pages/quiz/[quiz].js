import QuizTaking from "../../components/user/Quiz/QuizTaking"
import CenterLayout from '../../components/Layouts/CenterLayout.jsx'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function takequiz({props}) {
  return (
     <CenterLayout>
         <QuizTaking props= {props}/>
     </CenterLayout>
  )
}

takequiz.getInitialProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : null;

  const user = await fetch("http://localhost:3000/api/db/user", {
    method: "GET",
    headers: { "Content-Type": "application/json", cookie },
  });
  let currentUser
  try {
    currentUser = await user.json()
    currentUser = currentUser ? currentUser : null
  } catch (err) {
    console.error(err);
  }
  return { props: {currentUser} };
};