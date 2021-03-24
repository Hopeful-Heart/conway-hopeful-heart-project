import ApprovedEventRow from '../AdminPage/approvedEventRow';

function ApprovedEventTable({ admin }) {

    return (
        <table style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>User's Name</td>
                    <td>Date</td>
                    <td>Location</td>
                    <td>Link</td>
                    <td>Controls</td>
                </tr>
            </thead>
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
        </table>
    )
}
export default ApprovedEventTable;