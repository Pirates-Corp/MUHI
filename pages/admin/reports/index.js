import TableComponent from "../../../components/admin/Table/TableComponent";
import PrimaryHeading from "../../../components/common/Header/PrimaryHeading";
import BaseLayout from "../../../components/Layouts/BaseLayout.jsx";
export default function studentReport() {

  const data = [
      ['Siva prakash','1','400','3hr','4',"/admin/report/siva"],
      ['Adile','22','400','3hr','4',"/admin/report/siva"],
      ['Cinta Vj','23','400','3hr','4',"/admin/report/siva"],
      ['Sam','34','400','3hr','4',"/admin/report/siva"],
      ['GodWin','14','400','3hr','4',"/admin/report/siva"],
      ['tharun','1w','400','3hr','4',"/admin/report/siva"],
      ['kitty','1w','400','3hr','5',"/admin/report/siva"],
      ['tharun','1w','400','3hr','4',"/admin/report/siva"],
      ['tharun','1w','400','3hr','4',"/admin/report/siva"]
]

  return (
    <div>
      <BaseLayout>
        <PrimaryHeading heading="Reports" />
        <TableComponent
          col="6"
          colNames={["Student Name", "overall Rank","High score",' active ago',"test taken"]}
          buttonColor="blue"
          buttonText="View"
          data={data}
        />
      </BaseLayout>
    </div>
  );
}
