import React from 'react';
import { useDispatch } from "react-redux";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

function ApprovedUserRow({ user, superAdmin, setDefaultAdminView, setAdminUserView  }) {

    const dispatch = useDispatch();

    const updateApproved = (user) => {
        dispatch({ type: 'UPDATE_APPROVED_USER', payload: user })
    }

    const deleteApproved = (user) => {
        dispatch({ type: 'DELETE_APPROVED_USER', payload: user })
    }

    const updateNonAdminUser = (user) => {
        dispatch({ type: 'UPDATE_NONADMIN_USER', payload: user })
    }

    const updateAdminUser = (user) => {
        dispatch({ type: 'UPDATE_ADMIN_USER', payload: user })
    }

    return (
        <TableRow key={user.id}>
            <TableCell align="center">{`${user.first_name} ${user.last_name}`}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.phone}</TableCell>
            <TableCell align="center">{user.state}</TableCell>
            <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updateApproved(user)} style={{ margin: 2.5 }}>Freeze</Button><Button variant="contained" color="primary" onClick={() => deleteApproved(user)} style={{ margin: 2.5 }}>Delete</Button></TableCell>
            {!superAdmin ? <></> : !user.admin_user ? <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updateNonAdminUser(user)}>Admin</Button></TableCell> : <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updateAdminUser(user)}>Revoke Admin</Button></TableCell>}
        </TableRow>
    );
}

export default ApprovedUserRow;