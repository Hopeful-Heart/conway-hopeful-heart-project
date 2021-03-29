import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import './userDetails.css';

function UserDetails() {
    const user = useSelector(store => store.userSearch.userDetailsReucer);
    const loggedUser = useSelector(store => store.user);
    const connections = useSelector(store => store.connection.allConnectionsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_ALL_CONNECTIONS" });
    }, []);

    const connectRequest = () => {

        const alreadyConnected = new Promise((resolve, reject) => {
        
        for (let connection of connections) {
            if (connection.user1_id === loggedUser.id && connection.user2_id === user.id) {
                reject('You have already sent a request to this person!');
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
                    user1: loggedUser.id,
                    user2: user.id,
                }
            })
        }, reason => {
            // rejection
            alert(reason);
        });
    }

    return (
        <div className="detailsDiv container">
            <div className="detailsInfo">
                <h2>{`${user.first_name} ${user.last_name}`}</h2>
                <img src={user.profile_pic} style={{ maxWidth: 225, maxHeight: 225, borderRadius: "50%" }}></img>
                <h4>{user.email} | {user.phone}</h4>
                <h4>{`${user.state}, ${user.city}`}</h4>
                <h2>{user.child_first_name}</h2>
                {user.child_first_name === '' || user.child_last_name === '' || user.second_photo === '' || user.story === '' || user.special_sentiment === '' || user.birthday === null || user.memorial_date === null ? <p>No Child Information</p> :
                    <>
                        <h1>{`${user.child_first_name}'s Story`}</h1>
                        <p>{user.birthday}</p>
                        <p>{user.memorial_date}</p>
                        <img src={user.second_photo} />
                        <p>{user.story}</p>
                    </>
                }
                <button onClick={connectRequest}>Connect</button>
            </div>
        </div>
    )
}
export default UserDetails