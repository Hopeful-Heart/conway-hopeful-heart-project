import PendingUserRow from '../AdminPage/pendingUserRow';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

function PendingUserTable({admin}) {

    return (
        <Table style={{ textAlign: 'center' }}>
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">State</TableCell>
                    <TableCell align="center">Controls</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {admin.pendingUsersReducer.map(user => {
                    return (
                        <PendingUserRow
                            key={user.id}
                            user={user}
                        />
                    )
                })}
            </TableBody>
        </Table>
    )
}
export default PendingUserTable;