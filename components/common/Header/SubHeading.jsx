import style from "../../common/Header/SubHeading.module.scss";

const SubHeader = ({heading}) =>  <h1 className="mb-1-5" id={style.subHeading}>{heading}</h1>;

export default SubHeader