import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux'

function PendingEventRow({ event }) {

    const dispatch = useDispatch();

    const updatePending = (event) => {
        dispatch({type: 'UPDATE_PENDING_EVENT', payload: event})
    }

    return (
        <tr key={event.id}>
            <td>{event.name}</td>
            <td>{`${event.first_name}  ${event.last_name}`}</td>
            <td>{moment(event.date).format('YYYY-MM-DD')}</td>
            <td>{event.location}</td>
            <td>{event.link ? <a href={event.link}>Link</a> : 'No Link Provided'}</td>
            <td><button  style={{margin:2.5}} onClick={() => updatePending(event)}>Approve</button><button style={{margin:2.5}}>Deny</button></td>
        </tr>
    );
}
export default PendingEventRow;