import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

function PendingUserRow({ user }) {

    const dispatch = useDispatch();

    const updatePending = (user) => {
        dispatch({ type: 'UPDATE_PENDING_USER', payload: user })
    }

    const deletePending = (user) => {
        dispatch({ type: 'DELETE_PENDING_USER', payload: user })
    }
    
    return (

        <tr key={user.id}>
            <td>{`${user.first_name} ${user.last_name}`}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.state}</td>
            <td><button onClick={() => updatePending(user)} style={{ margin: 2.5 }}>Approve</button><button onClick={() => deletePending(user)} style={{ margin: 2.5 }}>Deny</button></td>
        </tr>
    );
}
export default PendingUserRow;