import style from "../../admin/Table/TableComponent.module.scss";
import Link from "next/link";
const TableComponent = () => {
  return (
    <div id={style.tableBox}>
      <div className={style.tableFeature}>
        <form>
          <input type="text" />
          <button className={style.searchBtn} type="submit">
            <img src="/imgs/svgs/search.svg" alt="" />
          </button>
        </form>
        <button id={style.fbtn} className="greenBtn mt-1">Sort</button>
      </div>

      <div className={style.tableScroll} >
            <ul className={style.table}>
                <li id={style.tableHeader} col='3'>
                    <p>S.No</p>
                    <p>Student Name</p>
                    <p>Overall Rank</p>
                    <p>Test Taken</p>
                </li>


                <li className={style.row}>
                    <p>1</p>
                    <p>Mohanmad MohanmadMohanmadMohanmadMohanmad</p>
                    <p>1</p>
                    <p>2</p>
                    <Link href="" >
                        <a className="blueBtn">View Report</a>
                    </Link>
                  
                </li>
                <li className={style.row}>
                    <p>1</p>
                    <p>Mohanmad</p>
                    <p>1</p>
                    <p>2</p>
                    <Link href="" >
                        <a className="blueBtn">View Report</a>
                    </Link>
                </li>

                <li className={style.row}>
                    <p>1</p>
                    <p>Mohanmad</p>
                    <p>1</p>
                    <p>2</p>
                    <Link href="" >
                        <a className="blueBtn">View Report</a>
                    </Link>
                </li>
                <li className={style.row}>
                    <p>1</p>
                    <p>Mohanmad</p>
                    <p>1</p>
                    <p>2</p>
                    <Link href="" >
                        <a className="blueBtn">View Report</a>
                    </Link>
                </li>
                <li className={style.row}>
                    <p>1</p>
                    <p>Mohanmad</p>
                    <p>1</p>
                    <p>2</p>
                    <Link href="" >
                        <a className="blueBtn">View Report</a>
                    </Link>
                </li>

            </ul>
      </div>
    </div>
  );
};

export default TableComponent;
