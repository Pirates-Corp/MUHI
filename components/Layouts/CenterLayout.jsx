import style from "../Layouts/CenterLayout.module.scss"
const CenterLayout = ({children}) =>
{
  return(
    <div className={style.container}>
        {children}
    </div>
  )
}

export default CenterLayout;