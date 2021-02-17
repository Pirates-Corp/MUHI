import style from "../../common/Header/SubHeading.module.scss";

const SubHeader = ({heading}) =>  <h1 id={style.subHeading}>{heading}</h1>;

export default SubHeader