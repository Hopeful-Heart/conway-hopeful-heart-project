import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSearchRow from './UserSearchRow';
import States from '../StatesDropdown/StatesDropdown';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AllUsersPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_USER_SEARCH_LIST" });
    dispatch({ type: "SET_ALL_STATES" });
  }, []);

  const userSearchList = useSelector((store) => store.userSearch); 
  const usState = useSelector((store) => store.userSearch.usStateReducer);
  let filteredList = [];

  const filterResults = () => {
    if (usState === "All States") {
      filteredList = userSearchList;
      return;
    }
    for (let user of userSearchList) {
      if (user.state === usState) {
        filteredList.push(user);
      }
    }
  }

  filteredList = userSearchList;

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>All Users Page</h1>
      <div style={{ textAlign: "center" }}>
        <form>
          <h3>Filter Results</h3>
          <States />
          <button onClick={filterResults}>Search</button>
        </form>
        {userSearchList.userSearchListReducer.map(user => {
          return (
            <div className="userDiv">
              <UserSearchRow
                key={user.id}
                user={user}
              />
            </div>
          )
        })}
      </div>
    </div >
  );
}

export default AllUsersPage;
