import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function PendingPages() {
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    return (
        <div className="container">
            <h2>Your Account is pending acceptance</h2>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default PendingPages;