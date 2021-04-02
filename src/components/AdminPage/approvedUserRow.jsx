import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

function ApprovedUserRow({ user, superAdmin }) {

    const dispatch = useDispatch();

    const updateApproved = (user) => {
        dispatch({ type: 'UPDATE_APPROVED_USER', payload: user })
    }

    const deleteApproved = (user) => {
        dispatch({ type: 'DELETE_APPROVED_USER', payload: user })
    }

    const adminUser = (user) => {
        dispatch({ type: 'ADMIN_USER', payload: user })
    }

    return (
        <tr key={user.id}>
            <td>{`${user.first_name} ${user.last_name}`}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.state}</td>
            <td><button onClick={() => updateApproved(user)} style={{ margin: 2.5 }}>Freeze</button><button onClick={() => deleteApproved(user)} style={{ margin: 2.5 }}>Delete</button></td>
            {!superAdmin && !user.admin_user && <td><button onClick={() => adminUser(user)}>Admin</button></td>}
        </tr>
    );
}
export default ApprovedUserRow;