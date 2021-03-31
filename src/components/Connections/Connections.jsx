import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AllUsersPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "FETCH_CONNECTIONS", payload: {user: user.id} });
        dispatch({ type: "FETCH_USER_SEARCH_LIST", payload: { state: 'All States'} });
    }, []);

    const user = useSelector((store) => store.user);
    const allUsers = useSelector((store) => store.userSearch.userSearchListReducer);
    const connections = useSelector((store) => store.connection.connectionsReducer);
    const allConnections = useSelector((store) => store.connection.allConnectionsReducer);
    let toBeApproved = [];
    let approvedList = [];
    let toApproveList;
    let connectionsList;

    const forwardConnection = (connection) => {

        dispatch({ type: "APPROVE_CONNECTION", payload: { id: connection.id, user: user.id } })

        const alreadyConnected = new Promise((resolve, reject) => {

            for (let con of allConnections) {
                if (con.user1_id === user.id && con.user2_id === connection.id) {
                    reject('Connection Approved!');
                    return;
                }
            }
            resolve('A Connection Request has been sent!');
        });

        alreadyConnected.then(value => {
            // fulfillment
            alert(value);
            dispatch({
                type: 'ADD_CONNECTION',
                payload: {
                    user1: user.id,
                    user2: connection.id,
                }
            })
        }, reason => {
            // rejection
            alert(reason);
        });
    } 

    for (let user of allUsers) {
        for (let connection of connections) {
            if (user.id === connection.user1_id && connection.approved === false) {
                toBeApproved.push(user);
            }
        }
    }

    for (let user of allUsers) {
        for (let connection of connections) {
            if (user.id === connection.user1_id && connection.approved === true) {
                approvedList.push(user);
            }
        }
    }


    if (toBeApproved[0]) {
        toApproveList = toBeApproved.map(connection =>
        (
            <div key={connection.id}>
                <p>{connection.first_name} {connection.last_name} wants to be a connection!</p>
                <button onClick={() => {forwardConnection(connection)}}>Approve</button>
                <button onClick={() => { dispatch({ type: "DISMISS_CONNECTION", payload: { id: connection.id, user: user.id } }) }}>Delete</button>
                <br />
            </div>
        )
        )
    } else {
        toApproveList = <p>No Requests!</p>
    }

    if (approvedList[0]) {
        connectionsList = approvedList.map(connection =>
        (
            <div className="detailsDiv container" key={connection.id}>
                <div className="detailsInfo">
                    <h2>{`${connection.first_name} ${connection.last_name}`}</h2>
                    <img src={connection.profile_pic} style={{ maxWidth: 225, maxHeight: 225, borderRadius: "50%" }}></img>
                    <h4>{connection.email} | {connection.phone}</h4>
                    <h4>{`${connection.state}, ${connection.city}`}</h4>
                    <h2>{connection.child_first_name}</h2>
                    {connection.child_first_name === '' || connection.child_last_name === '' || connection.second_photo === '' || connection.story === '' || connection.special_sentiment === '' || connection.birthday === null || connection.memorial_date === null ? <p>No Child Information</p> :
                        <>
                            <h1>{`${connection.child_first_name}'s Story`}</h1>
                            <p>{connection.birthday}</p>
                            <p>{connection.memorial_date}</p>
                            <img src={connection.second_photo} />
                            <p>{connection.story}</p>
                        </>
                    }
                </div>
            </div>
        )
        )
    } else {
        connectionsList = <p>No Connections!</p>
    }

    return (
        <div className="container">
            <h3>Requests:</h3>
            {toApproveList}
            <h3>Connections:</h3>
            {connectionsList}
        </div >
    );
}

export default AllUsersPage;