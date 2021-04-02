import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

function PendingUserRow({ user }) {

    const dispatch = useDispatch();

    const updatePending = (user) => {
        dispatch({ type: 'UPDATE_PENDING_USER', payload: user })
    }

    const deletePending = (user) => {
        dispatch({ type: 'DELETE_PENDING_USER', payload: user })
    }
    
    return (

        <TableRow key={user.id}>
            <TableCell align="center">{`${user.first_name} ${user.last_name}`}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.phone}</TableCell>
            <TableCell align="center">{user.state}</TableCell>
            <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updatePending(user)} style={{ margin: 2.5 }}>Approve</Button><Button variant="contained" color="primary" onClick={() => deletePending(user)} style={{ margin: 2.5 }}>Deny</Button></TableCell>
        </TableRow>
    );
}
export default PendingUserRow;