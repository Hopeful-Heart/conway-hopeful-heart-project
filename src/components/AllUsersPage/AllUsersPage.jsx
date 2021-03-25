import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userSearchReducer from '../../redux/reducers/userSearch.reducer';
import UserSearchRow from './UserSearchRow';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AllUsersPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_USER_SEARCH_LIST" });
  }, []);

  const userSearchList = useSelector((store) => store.userSearch);

  return (
    <div className="userListContainer">
      <h1 style={{ textAlign: "center" }}>All Users Page</h1>
      <div style={{ textAlign: "center" }}>
        <form>
          <input name="contact" value="ND" type="radio" />
          <label>ND</label>
          <input name="contact" value="NE" type="radio" />
          <label>NE</label>
          <button>Search</button>
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
