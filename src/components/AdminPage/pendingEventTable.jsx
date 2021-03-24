import PendingEventRow from '../AdminPage/pendingEventRow';

function PendingEventTable({admin}) {

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
            <tbody>
                {admin.pendingEventsReducer.map(event => {
                    return (
                        <PendingEventRow
                            key={event.id}
                            event={event}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}
export default PendingEventTable;