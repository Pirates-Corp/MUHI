import style from "../Layouts/BaseLayout.module.scss"
import AdminSideBar from "../admin/AdminSideBar"
const BaseLayout = ({children}) =>
{
  return(
    <>
     <AdminSideBar/> 
      <div className={style.container}>
       
        {children}
    </div>
    </>
  )
}

export default BaseLayout;