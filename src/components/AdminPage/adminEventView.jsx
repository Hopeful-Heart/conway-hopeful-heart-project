import PendingEventTable from '../AdminPage/pendingEventTable'
import ApprovedEventTable from '../AdminPage/approvedEventTable'
import Button from '@material-ui/core/Button';

function AdminEventView({ admin, setDefaultAdminView, setAdminEventView  }) {
    const resetDefaultAdminView = () => {
        setDefaultAdminView(true)
        setAdminEventView(false)
      }
    return (
        <div className="container">
            <Button onClick={resetDefaultAdminView} variant="contained" color="primary">Back</Button>
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