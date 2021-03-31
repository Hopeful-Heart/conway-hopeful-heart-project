import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSearchRow from "./UserSearchRow";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AllUsersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_USER_SEARCH_LIST",
      payload: { state: "All States" },
    });
  }, []);

  const userSearchList = useSelector((store) => store.userSearch);
  const states = useSelector((store) => store.states.statesReducer);

  const seeAllStates = () => {
    dispatch({
      type: "FETCH_USER_SEARCH_LIST",
      payload: { state: "All States" },
    });
  };

  const useStyles = makeStyles({
    formControl: { minWidth: 120 },
  });

  const classes = useStyles();

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>All Users Page</h1>
      <div style={{ textAlign: "center" }}>
        <h3>Filter Results</h3>
        <button onClick={seeAllStates}>See All Users</button>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          required
        >
          <InputLabel id="register-select-state-label">State</InputLabel>
          <Select
            labelId="register-select-state-label"
            id="demo-simple-select-outlined"
            value={''}
            onChange={(event) =>
              dispatch({
                type: "FETCH_USER_SEARCH_LIST",
                payload: { state: event.target.value },
              })
            }
            label="State"
            required
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {userSearchList.userSearchListReducer[0] ? (
          userSearchList.userSearchListReducer.map((user) => {
            return (
              <div className="userDiv" key={user.id}>
                <UserSearchRow key={user.id} user={user} />
              </div>
            );
          })
        ) : (
          <h2>No Results!</h2>
        )}
      </div>
    </div>
  );
}

export default AllUsersPage;
