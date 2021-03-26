import PendingUserRow from '../AdminPage/pendingUserRow';

function PendingUserTable({admin}) {

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
            <tbody>
                {admin.pendingUsersReducer.map(user => {
                    return (
                        <PendingUserRow
                            key={user.id}
                            user={user}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}
export default PendingUserTable;