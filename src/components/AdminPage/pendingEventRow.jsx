import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

function PendingEventRow({ event }) {

    const dispatch = useDispatch();

    const updatePending = (event) => {
        dispatch({type: 'UPDATE_PENDING_EVENT', payload: event})
    }

    const deletePending = (event) => {
        dispatch({type: 'DELETE_PENDING_EVENT', payload: event})
    }

    return (
        <TableRow key={event.id}>
            <TableCell align="center">{event.name}</TableCell>
            <TableCell align="center">{`${event.first_name}  ${event.last_name}`}</TableCell>
            <TableCell align="center">{moment(event.date).format('YYYY-MM-DD')}</TableCell>
            <TableCell align="center">{event.location}</TableCell>
            <TableCell align="center">{event.link ? <a href={event.link}>Link</a> : 'No Link Provided'}</TableCell>
            <TableCell align="center"><Button variant="contained" color="primary" style={{margin:2.5}} onClick={() => updatePending(event)}>Approve</Button><Button variant="contained" color="primary" onClick={() => deletePending(event)} style={{margin:2.5}}>Deny</Button></TableCell>
        </TableRow>
    );
}
export default PendingEventRow;