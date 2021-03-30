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
    dispatch({ type: "SET_ALL_STATES" });
    dispatch({ type: "FETCH_USER_SEARCH_LIST", payload: { state: "All States" }});
  }, []);

  const userSearchList = useSelector((store) => store.userSearch); 
  const usState = useSelector((store) => store.userSearch.usStateReducer);

  const filterResults = () => {
    dispatch({ type: "FETCH_USER_SEARCH_LIST", payload: { state: usState } });
  }

  const seeAllStates = () => {
    dispatch({ type: "FETCH_USER_SEARCH_LIST", payload: { state: "All States" } });
  }


  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>All Users Page</h1>
      <div style={{ textAlign: "center" }}>
        <form>
          <h3>Filter Results</h3>
          <button onClick={seeAllStates}>See All Users</button>
          <States />
          <button onClick={filterResults}>Search</button>
        </form>
        {userSearchList.userSearchListReducer[0]
        ?
        (
          userSearchList.userSearchListReducer.map(user => {
          return (
            <div className="userDiv" key={user.id}>
              <UserSearchRow
                key={user.id}
                user={user}
              />
            </div>
          )
        })
        )
        :
        <h2>No Results!</h2>
        }
      </div>
    </div >
  );
}

export default AllUsersPage;
