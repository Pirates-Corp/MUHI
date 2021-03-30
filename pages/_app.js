import '../styles/globals.scss'
import {AuthContextProvider} from '../components/context/AuthContext'


function MyApp({ Component, pageProps }) {


    
    return <AuthContextProvider>
              <Component {...pageProps}/>
          </AuthContextProvider>
    
    
      
}

export default MyApp

