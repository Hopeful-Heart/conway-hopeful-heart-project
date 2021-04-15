import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import {
    TableRow,
    TableCell,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from '@material-ui/core'

function ApprovedUserRow({ user, superAdmin, setDefaultAdminView, setAdminUserView }) {

    const dispatch = useDispatch();

    const [openDelete, setOpenDelete] = useState(false);

    const [deleteUser, setDeleteUser] = useState({
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

    const handleOpenDelete = (user) => {
        setDeleteUser(user);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const updateApproved = (user) => {
        dispatch({ type: 'UPDATE_APPROVED_USER', payload: user })
    }

    const deleteApprovedUser = (user) => {
        dispatch({ type: 'DELETE_APPROVED_USER', payload: user })
    }

    const updateNonAdminUser = (user) => {
        dispatch({ type: 'UPDATE_NONADMIN_USER', payload: user })
    }

    const updateAdminUser = (user) => {
        dispatch({ type: 'UPDATE_ADMIN_USER', payload: user })
    }

    return (
        <>
            <TableRow key={user.id}>
                <TableCell align="center">{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.state}</TableCell>
                <TableCell align="center"><Tooltip title="This will freeze the user's account, not allowing them to access the application."><Button variant="contained" color="primary" onClick={() => updateApproved(user)} style={{ margin: 2.5 }}>Freeze</Button></Tooltip><Tooltip title="This will remove the user's account forever!"><Button variant="contained" color="primary" onClick={() => handleOpenDelete(user)} style={{ margin: 2.5 }}>Delete</Button></Tooltip></TableCell>
                {!superAdmin ? <></> : !user.admin_user ? <TableCell align="center"><Tooltip title="This will give a user admin level access."><Button variant="contained" color="primary" onClick={() => updateNonAdminUser(user)}>Admin</Button></Tooltip></TableCell> : <TableCell align="center"><Tooltip title="This will remove a user's admin level access."><Button variant="contained" color="primary" onClick={() => updateAdminUser(user)}>Revoke Admin</Button></Tooltip></TableCell>}
            </TableRow>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are You Sure You want to delete this user? They will be lost forever!
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={() => deleteApprovedUser(deleteUser)} color="primary" autoFocus>
                        Delete
                        </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ApprovedUserRow;