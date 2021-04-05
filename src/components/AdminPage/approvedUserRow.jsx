import React, {useState} from 'react';
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
                <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updateApproved(user)} style={{ margin: 2.5 }}>Freeze</Button><Button variant="contained" color="primary" onClick={() => handleOpenDelete(user)} style={{ margin: 2.5 }}>Delete</Button></TableCell>
                {!superAdmin ? <></> : !user.admin_user ? <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updateNonAdminUser(user)}>Admin</Button></TableCell> : <TableCell align="center"><Button variant="contained" color="primary" onClick={() => updateAdminUser(user)}>Revoke Admin</Button></TableCell>}
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