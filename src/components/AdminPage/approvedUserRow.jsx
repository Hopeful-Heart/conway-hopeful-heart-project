import React, { useEffect } from 'react';

function ApprovedUserRow({ user }) {
    return (
        <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.state}</td>
            <td><button style={{margin:2.5}}>Freeze</button><button style={{margin:2.5}}>Delete</button></td>
        </tr>
    );
}
export default ApprovedUserRow;