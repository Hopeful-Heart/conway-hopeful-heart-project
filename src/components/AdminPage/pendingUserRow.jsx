import React, { useEffect } from 'react';

function PendingUserRow({ user }) {
    return (

        <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.state}</td>
            <td><button style={{margin:2.5}}>Approve</button><button style={{margin:2.5}}>Deny</button></td>
        </tr>
    );
}
export default PendingUserRow;