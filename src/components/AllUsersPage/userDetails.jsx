import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { Paper, makeStyles } from "@material-ui/core";
import "./userDetails.css";
import { useHistory } from "react-router";
function UserDetails() {

  const user = useSelector((store) => store.userSearch.userDetailsReucer);
  const loggedUser = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection.allConnectionsReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_CONNECTIONS" });
  }, []);

  const connectRequest = () => {
    const alreadyConnected = new Promise((resolve, reject) => {
      for (let connection of connections) {
        if (
          connection.user1_id === loggedUser.id &&
          connection.user2_id === user.id
        ) {
          reject("You have already sent a request to this person!");
          return;
        }
      }
      resolve("A Connection Request has been sent!");
    });
    alreadyConnected.then(
      (value) => {
        // fulfillment
        alert(value);
        dispatch({
          type: "ADD_CONNECTION",
          payload: {
            user1: loggedUser.id,
            user2: user.id,
          },
        });
      },
      (reason) => {
        // rejection
        alert(reason);
      }
    );
  };

  const handleReturn = () => {
    history.push('/allusers')
  }

  const useStyles = makeStyles({
    paper: {
      margin: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "fit-content",
      padding: "2rem",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <div className="detailsDiv container">
      <div className="detailsInfo">
        <Button onClick={handleReturn} variant="contained" color="primary">Return</Button>
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <img
          src={user.profile_pic}
          style={{
            height: 200,
            width: 200,
            objectFit: "cover",
            borderRadius: "50%",
            border: "solid gray 1px",
          }}
        ></img>
        <h4>
          {user.email} | {user.phone}
        </h4>
        {user.city ? (
          <h3>{`${user.city},${user.state}`}</h3>
        ) : (
          <h3>{user.state}</h3>
        )}
        {user.child_first_name === "" ||
          user.child_last_name === "" ||
          user.second_photo === "" ||
          user.story === "" ||
          user.special_sentiment === "" ||
          user.birthday === null ||
          user.memorial_day === null ? (
          <p>No Child Information</p>
        ) : (
          <>
            <h1>{`${user.child_first_name}'s Story`}</h1>
            <p>Birth Date: {moment(user.birthday).format("MMMM Do YYYY")}</p>
            <p>
              Memorial Date: {moment(user.memorial_day).format("MMMM Do YYYY")}
            </p>
            <img
              src={user.second_photo}
              style={{
                height: 200,
                width: 200,
                objectFit: "cover",
                borderRadius: "50%",
                border: "solid gray 1px",
              }}
            />
            <p>{user.story}</p>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 30 }}
          onClick={connectRequest}
        >
          Connect
        </Button>
      </div>
    </div>
  );
}
export default UserDetails;
