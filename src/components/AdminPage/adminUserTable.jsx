import AdminUserRow from './adminUserRow';

function AdminUserTable({ admin }) {

    return (
        <table style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone Number</td>
                    <td>State</td>
                    <td>Controls</td>
                </tr>
            </thead>
            {admin.adminUserReducer.length > 0 && <tbody>
                {admin.adminUserReducer.map(user => {
                    return (
                        <AdminUserRow
                            key={user.id}
                            user={user}
                        />
                    )
                })}
            </tbody>}
        </table>
    )
}
export default AdminUserTable;