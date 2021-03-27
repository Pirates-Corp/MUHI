import style from "../Layouts/BaseLayout.module.scss"
import SideBar from "../common/Components/SideBar"

const BaseLayout = ({children}) =>
{
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