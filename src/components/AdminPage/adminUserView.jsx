import PendingUserTable from '../AdminPage/pendingUserTable'
import ApprovedUserTable from '../AdminPage/approvedUserTable'

function AdminUserView({admin}) {
    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Admin Page</h1>
            <br />
            <h3 style={{ textAlign: 'center' }}>Pending Users</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PendingUserTable
                    admin={admin}
                />
            </div>
            <br />
            <div>
                <h3 style={{ textAlign: 'center' }}>Approved Users</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ApprovedUserTable
                        admin={admin}
                    />
                </div>
            </div>
        </div>
    )
}
export default AdminUserView;