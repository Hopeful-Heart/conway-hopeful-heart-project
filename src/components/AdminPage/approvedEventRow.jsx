import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function ApprovedEventRow({ event }) {

    const dispatch = useDispatch();

    const updateApproved = (event) => {
        dispatch({ type: 'UPDATE_APPROVED_EVENT', payload: event })
    }
    const deleteApproved = (event) => {
        dispatch({ type: 'DELETE_APPROVED_EVENT', payload: event })
    }

    return (
        <TableRow key={event.id}>
            <TableCell align="center">{event.name}</TableCell>
            <TableCell align="center">{`${event.first_name} ${event.last_name}`}</TableCell>
            <TableCell align="center">{moment(event.date).format('YYYY-MM-DD')}</TableCell>
            <TableCell align="center">{event.location}</TableCell>
            <TableCell align="center">{event.link ? <a href={event.link}>Link</a> : 'No Link Provided'}</TableCell>
            <TableCell align="center"><Button variant="contained" color="primary" style={{ margin: 2.5 }} onClick={() => updateApproved(event)}>Unapprove</Button><Button variant="contained" color="primary" onClick={() => deleteApproved(event)} style={{ margin: 2.5 }}>Delete</Button></TableCell>
        </TableRow>
    );
}
export default ApprovedEventRow;