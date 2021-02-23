import TableComponent from '../../../components/admin/Table/TableComponent'
import PrimaryHeading from '../../../components/common/Header/PrimaryHeading'
import BaseLayout from '../../../components/Layouts/BaseLayout.jsx'
export default function studentReport() {
  return (
    <div>
     
      <BaseLayout>
      <PrimaryHeading heading="Student Reports"/>
      <TableComponent/>
      </BaseLayout>
    </div>
  )
}
