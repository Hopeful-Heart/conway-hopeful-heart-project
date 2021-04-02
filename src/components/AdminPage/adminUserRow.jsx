import { useDispatch } from 'react-redux'

function AdminUserRow({ user }) {

    const dispatch = useDispatch();

    return (
        <tr key={user.id}>
            <td>{`${user.first_name} ${user.last_name}`}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.state }</td>
            <td><button style={{ margin: 2.5 }} onClick={() => updateApproved(user)}>Revoke Admin</button></td>
        </tr>
    );
}
export default AdminUserRow;