import CenterLayout from "../../components/Layouts/CenterLayout.jsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OpenQuizTaking from "../../components/common/Components/OpenQuizTaking";

export default function takequiz({ props }) {
  return (
    <CenterLayout>
      <OpenQuizTaking />
    </CenterLayout>
  );
}

// takequiz.getInitialProps = async (ctx) => {
//   const cookie = ctx.req ? ctx.req.headers.cookie : null;

//   const user = await fetch(`http://localhost:3000/api/db/user`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json", cookie },
//   });
//   let currentUser;
//   try {
//     currentUser = await user.json();
//     currentUser = currentUser ? currentUser : null;
//   } catch (err) {
//     console.error(err);
//   }
//   return { props: { currentUser } };
// };
