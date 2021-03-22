import React from "react";
import { useSelector, useDispatch } from "react-redux";

function PendingPages() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h2>Your Account is pending acceptance</h2>
      <br />
      <button
        onClick={() =>
          dispatch({ type: "UPDATE_AUTHORIZED_USER", payload: true })
        }
      >
        Authorize Account
      </button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default PendingPages;
