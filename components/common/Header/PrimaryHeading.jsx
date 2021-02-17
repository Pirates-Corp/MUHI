import style from "../../common/Header/PrimaryHeading.module.scss";

const PrimaryHeader = ({heading}) =>  <h1 id={style.primaryHeading}>{heading}</h1>;

export default PrimaryHeader