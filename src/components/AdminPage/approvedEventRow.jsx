import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux'
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

function ApprovedEventRow({ event }) {

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const dispatch = useDispatch();

    const [openDelete, setOpenDelete] = useState(false);

    const [deleteEvent, setDeleteEvent] = useState({
        date: "",
        description: "",
        first_name: "",
        id: "",
        last_name: "",
        link: "",
        location: "",
        name: "",
        type: "",
    })

    const handleOpenDelete = (event) => {
        setDeleteEvent(event);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const updateApproved = (event) => {
        dispatch({ type: 'UPDATE_APPROVED_EVENT', payload: event })
    }

    const deleteApprovedEvent = (deleteEvent) => {
        dispatch({ type: 'DELETE_APPROVED_EVENT', payload: deleteEvent })
    }

    return (
        <>
            <TableRow key={event.id}>
                <TableCell align="center">{event.name}</TableCell>
                <TableCell align="center">{`${event.first_name} ${event.last_name}`}</TableCell>
                <TableCell align="center">{moment(event.date).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="center">{event.location}</TableCell>
                <TableCell align="center">{event.link ? <a href={event.link}>Link</a> : 'No Link Provided'}</TableCell>
                <TableCell align="center"><Button variant="contained" color="primary" style={{ margin: 2.5 }} onClick={() => updateApproved(event)}>Unapprove</Button><Button variant="contained" color="primary" onClick={() => handleOpenDelete(event)} style={{ margin: 2.5 }}>Delete</Button></TableCell>
            </TableRow>
            {/* <Snackbar>
                <Alert open={open} autoHideDuration={2500} onClose={handleClose} variant="filled" severity="error">Event Unapproved</Alert>
            </Snackbar> */}
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are You Sure You want to delete this event? It will be lost forever!    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteApprovedEvent(deleteEvent)} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default ApprovedEventRow;