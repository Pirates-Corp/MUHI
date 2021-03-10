import PrimaryHeading from '../../../components/common/Header/PrimaryHeading'
import BaseLayout from '../../../components/Layouts/BaseLayout.jsx'
import TableComponent from "../../../components/admin/Table/TableComponent";
export default function accounts() {


  

  const data = [
    ['user ','user@gmail.com','9832100323',"/admin/report/siva"],
    ['user ','user@gmail.com','9832100323',"/admin/report/siva"],
    ['user ','user@gmail.com','9832100323',"/admin/report/siva"],
    ['user ','user@gmail.com','9832100323',"/admin/report/siva"],
    ['user ','user@gmail.com','9832100323',"/admin/report/siva"],
    ['user ','user@gmail.com','9832100323',"/admin/report/siva"],
    ['user ','user@gmail.com','9832100323',"/admin/report/siva"],

]



  return (
    <div>
      <BaseLayout>
      <PrimaryHeading heading="Account Management"/>
      <TableComponent
          col="4"
          colNames={["Student Name", "email","phone"]}
          buttonColor="red"
          buttonText="Terminate"
          data={data}
        />
      </BaseLayout>
    </div>
  )
}
