import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import BaseLayout from '../../../components/Layouts/BaseLayout.jsx';
import Link from 'next/link';
export default function quizzes() {
  return (
    <>
      <BaseLayout>
        <PrimaryHeading heading="Quiz"/>
        <Link href='quiz/create-quiz' >
            <a  className='seBtn'>
               <img src="/imgs/svgs/AddQuestionPlus.svg"></img>
               Create
            </a>
        </Link>
       <button className='seBtn' > <img src="/imgs/svgs/AddQuestionPlus.svg"></img> Create</button>
               
      </BaseLayout>
    </>
  )
}
