import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AllUsersPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "FETCH_CONNECTIONS", payload: {user: user.id} });
    }, []);

    const user = useSelector((store) => store.user);
    const connections = useSelector((store) => store.connection.connectionsReducer);
    let approvedList = [];
    let list;

    for (let connection of connections) {
        if (connection.approved === false) {
            approvedList.push(connection);
        }
    }

    if (approvedList[0]) {
        list = approvedList.map(connection =>
        (
            <div key={connection.id}>
                <p>{connection.user1_id} wants to be a connection!</p>
                <button>Connect</button>
                <button>Dismiss</button>
                <br />
            </div>
        )
        )
    } else {
        list = <p>No Upcoming Events</p>
    }

    return (
        <div className="container">
            <h3>Requests:</h3>
            {list}
        </div >
    );
}

export default AllUsersPage;