import PrimaryHeading from '../../../components/common/Header/PrimaryHeading'
import TableComponent from "../../../components/admin/Table/TableComponent";
export default function Students() {

 const data = [
    ['student',"student@gmail.com","9859023232","/admin/report/siva"],
    ['student',"student@gmail.com","9859023232","/admin/report/siva"],
    ['student',"student@gmail.com","9859023232","/admin/report/siva"],
    ['student',"student@gmail.com","9859023232","/admin/report/siva"],
    ['student',"student@gmail.com","9859023232","/admin/report/siva"],
    ['student',"student@gmail.com","9859023232","/admin/report/siva"],
]

  return(
    <>
      <PrimaryHeading heading="student"/>
      <TableComponent
          col="4"
          colNames={["Name", "Email","Phone"]}
          buttonColor="red"
          buttonText="Terminate"
          data={data}
        />
    </>
  )
}