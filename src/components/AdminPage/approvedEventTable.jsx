import ApprovedEventRow from '../AdminPage/approvedEventRow';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

function ApprovedEventTable({ admin }) {

    return (
        <Table style={{ textAlign: 'center' }}>
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">User's Name</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Link</TableCell>
                    <TableCell align="center">Controls</TableCell>
                </TableRow>
            </TableHead>
            {admin.approvedEventsReducer.length > 0 && <tbody>
                {admin.approvedEventsReducer.map(event => {
                    return (
                        <ApprovedEventRow
                            key={event.id}
                            event={event}
                        />
                    )
                })}
            </tbody>}
        </Table>
    )
}
export default ApprovedEventTable;