import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux'

function ApprovedEventRow({ event }) {

    const dispatch = useDispatch();

    const updateApproved = (event) => {
        dispatch({ type: 'UPDATE_APPROVED_EVENT', payload: event })
    }
    const deleteApproved = (event) => {
        dispatch({ type: 'DELETE_APPROVED_EVENT', payload: event })
    }

    return (
        <tr key={event.id}>
            <td>{event.name}</td>
            <td>{`${event.first_name} ${event.last_name}`}</td>
            <td>{moment(event.date).format('YYYY-MM-DD')}</td>
            <td>{event.location}</td>
            <td>{event.link ? <a href={event.link}>Link</a> : 'No Link Provided'}</td>
            <td><button style={{ margin: 2.5 }} onClick={() => updateApproved(event)}>Unapprove</button><button onClick={() => deleteApproved(event)} style={{ margin: 2.5 }}>Delete</button></td>
        </tr>
    );
}
export default ApprovedEventRow;