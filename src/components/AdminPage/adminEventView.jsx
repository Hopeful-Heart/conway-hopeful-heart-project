import PendingEventTable from '../AdminPage/pendingEventTable'
import ApprovedEventTable from '../AdminPage/approvedEventTable'

function AdminEventView({ admin }) {
    return (
        <div className="container">
            <h3 style={{ textAlign: 'center' }}>Pending Events</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PendingEventTable
                    admin={admin}
                />
            </div>
            <br />
            <div>
                <h3 style={{ textAlign: 'center' }}>Approved Events</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ApprovedEventTable
                        admin={admin}
                    />
                </div>
            </div>
        </div>
    )
}
export default AdminEventView;