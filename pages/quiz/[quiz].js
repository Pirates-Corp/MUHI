import QuizTaking from "../../components/user/Quiz/QuizTaking"
import CenterLayout from '../../components/Layouts/CenterLayout.jsx'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function takequiz() {
  return (
     <CenterLayout>
         <QuizTaking/>
     </CenterLayout>
  )
}