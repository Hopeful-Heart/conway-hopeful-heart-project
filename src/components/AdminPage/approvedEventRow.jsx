import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux'
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

function ApprovedEventRow({ event }) {

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
                <TableCell align="center"><Tooltip title="This will move the event to the pending table, removing it from view on the calendar"><Button variant="contained" color="primary" style={{ margin: 2.5 }} onClick={() => updateApproved(event)}>Unapprove</Button></Tooltip><Tooltip title="This is will remove the event forever!"><Button variant="contained" color="primary" onClick={() => handleOpenDelete(event)} style={{ margin: 2.5 }}>Delete</Button></Tooltip></TableCell>
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