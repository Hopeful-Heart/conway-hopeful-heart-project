import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function PendingUserRow({ user }) {

    const dispatch = useDispatch();

    const [openDeny, setOpenDeny] = useState(false);

    const [denyUser, setDenyUser] = useState({
        admin_user: "",
        approved_user: "",
        birthday: "",
        child_first_name: "",
        child_last_name: "",
        city: "",
        client_token: "",
        email: "",
        first_name: "",
        id: "",
        last_name: "",
        memorial: "",
        memorial_day: "",
        password: "",
        phone: "",
        profile_pic: "",
        second_photo: "",
        special_sentiment: "",
        state: "",
        story: "",
        super_admin: "",
    })

    const updatePending = (user) => {
        dispatch({ type: 'UPDATE_PENDING_USER', payload: user })
    }

    const  denyPendingUser = (user) => {
        dispatch({ type: 'DELETE_PENDING_USER', payload: user })
    }
    const handleOpenDeny = (user) => {
        setDenyUser(user);
        setOpenDeny(true);
    };

    const handleCloseDeny = () => {
        setOpenDeny(false);
    };

    return (
        <>
            <TableRow key={user.id}>
                <TableCell align="center">{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.state}</TableCell>
                <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updatePending(user)} style={{ margin: 2.5 }}>Approve</Button><Button variant="contained" color="primary" onClick={() => handleOpenDeny(user)} style={{ margin: 2.5 }}>Deny</Button></TableCell>
            </TableRow>

            <Dialog
                open={openDeny}
                onClose={handleCloseDeny}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are You Sure You want to deny this user?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeny} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={() => denyPendingUser(denyUser)} color="primary" autoFocus>
                        Deny
                        </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default PendingUserRow;