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


function PendingEventRow({ event }) {

    const dispatch = useDispatch();

    const [openDeny, setOpenDeny] = useState(false);

    const [denyEvent, setDenyEvent] = useState({
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

    const handleOpenDeny = (event) => {
        setDenyEvent(event);
        setOpenDeny(true);
    };

    const handleCloseDeny = () => {
        setOpenDeny(false);
    };

    const updatePending = (event) => {
        dispatch({ type: 'UPDATE_PENDING_EVENT', payload: event })
    }

    const denyPendingEvent = (event) => {
        dispatch({ type: 'DELETE_PENDING_EVENT', payload: event })
    }

    return (
        <>
            <TableRow key={event.id}>
                <TableCell align="center">{event.name}</TableCell>
                <TableCell align="center">{`${event.first_name}  ${event.last_name}`}</TableCell>
                <TableCell align="center">{moment(event.date).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="center">{event.location}</TableCell>
                <TableCell align="center">{event.link ? <a href={event.link}>Link</a> : 'No Link Provided'}</TableCell>
                <TableCell align="center"><Button variant="contained" color="primary" style={{ margin: 2.5 }} onClick={() => updatePending(event)}>Approve</Button><Button variant="contained" color="primary" onClick={() => handleOpenDeny(event)} style={{ margin: 2.5 }}>Deny</Button></TableCell>
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
                        Are You Sure You want to deny this event? It will be lost forever!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeny} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => denyPendingEvent(denyEvent)} color="primary" autoFocus>
                        Deny
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default PendingEventRow;