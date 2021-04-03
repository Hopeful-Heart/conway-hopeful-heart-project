import { SupervisedUserCircle } from '@material-ui/icons';
import ApprovedUserRow from '../AdminPage/approvedUserRow';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

function ApprovedUserTable({ admin, superAdmin, setDefaultAdminView, setAdminUserView }) {
  
  return (
    <Table>
      <TableHead>
        <TableRow align="center">
          <TableCell align="center">Name</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">Phone Number</TableCell>
          <TableCell align="center">State</TableCell>
          <TableCell align="center">Basic Controls</TableCell>
          <TableCell align="center">Admin Controls</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {admin.approvedUsersReducer.map(user => {
          return (
            <ApprovedUserRow
              key={user.id}
              user={user}
              superAdmin={superAdmin}
              setDefaultAdminView={setDefaultAdminView}
              setAdminUserView={setAdminUserView}
            />
          )
        })}
      </TableBody>
    </Table>
  )
}
export default ApprovedUserTable;