import { useState } from 'react'
import '../styles/globals.scss'
import {QuizContext} from "../utils/contextStore/quizData"

function MyApp({ Component, pageProps }) {

    const [Quiz , SetQuiz ] = useState({})
    return <QuizContext.Provider value={[Quiz , SetQuiz]}>
             <Component {...pageProps} />
          </QuizContext.Provider>

   
  

}

export default MyApp
