import {useContext } from 'react'
import {useRouter} from "next/router"
import style from "../Layouts/BaseLayout.module.scss"
import SideBar from "../common/Components/SideBar"
import {AuthContext} from '../context/AuthContext'

const BaseLayout = ({children}) =>
{
  const router = useRouter();

  const [user] = useContext(AuthContext);

   if(user === null  )
   {
    router.push('/')
   }

   if(user)
   {
     if(user.role=="user" && (router.pathname).startsWith('/admin'))
     {
      router.push('/dashboard');
     }
   }
   else{
      router.push('/');
   }
   


  let type;
  try {
    type = (children[0].props.type == "user") ? "user" : " ";
  } catch (error) {
    type = " "
  }

  return(
    <>
     <SideBar type={type} /> 
      <div className={style.container}>
        {children}
      </div>
    </>
  )
}

export default BaseLayout;