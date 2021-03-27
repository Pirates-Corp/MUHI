import PrimaryHeading from '../../../components/common/Header/PrimaryHeading'
import TableComponent from "../../../components/admin/Table/TableComponent";
export default function ModeratorAccount() {

  const data = [
    ['Moderator',"moderator@gmail.com","9859023232","/admin/report/siva"],
    ['Moderator',"moderator@gmail.com","9859023232","/admin/report/siva"],
    ['Moderator',"moderator@gmail.com","9859023232","/admin/report/siva"],
    ['Moderator',"moderator@gmail.com","9859023232","/admin/report/siva"],
    ['Moderator',"moderator@gmail.com","9859023232","/admin/report/siva"],
    ['Moderator',"moderator@gmail.com","9859023232","/admin/report/siva"],
]



  return (
    <>
      <PrimaryHeading heading="Moderators"/>
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
