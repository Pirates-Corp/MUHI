import style from "../Layouts/CenterLayout.module.scss"
import {useContext } from 'react'
import {useRouter} from "next/router"
import {AuthContext} from '../context/AuthContext'
const CenterLayout = ({children}) =>
{

  const router = useRouter();

  const [user] = useContext(AuthContext);

   if(user === null )
   {
   router.push('/')
   }



  return(
    <div className={style.container}>
        {children}
    </div>
  )
}

export default CenterLayout;