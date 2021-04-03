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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const updateApproved = (event) => {
        handleClick();
        dispatch({ type: 'UPDATE_APPROVED_EVENT', payload: event })
    }
    const deleteApproved = (event) => {
        dispatch({ type: 'DELETE_APPROVED_EVENT', payload: event })
    }

    return (
        <>
            <TableRow key={event.id}>
                <TableCell align="center">{event.name}</TableCell>
                <TableCell align="center">{`${event.first_name} ${event.last_name}`}</TableCell>
                <TableCell align="center">{moment(event.date).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="center">{event.location}</TableCell>
                <TableCell align="center">{event.link ? <a href={event.link}>Link</a> : 'No Link Provided'}</TableCell>
                <TableCell align="center"><Button variant="contained" color="primary" style={{ margin: 2.5 }} onClick={() => updateApproved(event)}>Unapprove</Button><Button variant="contained" color="primary" onClick={() => deleteApproved(event)} style={{ margin: 2.5 }}>Delete</Button></TableCell>
            </TableRow>
            {/* <Snackbar>
                <Alert open={open} autoHideDuration={2500} onClose={handleClose} variant="filled" severity="error">Event Unapproved</Alert>
            </Snackbar> */}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default ApprovedEventRow;