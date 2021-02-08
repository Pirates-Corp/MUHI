import style from "../Layouts/BaseLayout.module.scss"
const BaseLayout = ({children}) =>
{
  return(
    <div className={style.container}>
        {children}
    </div>
  )
}

export default BaseLayout;