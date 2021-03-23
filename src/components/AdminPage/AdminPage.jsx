import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminUserView from '../AdminPage/adminUserView';
// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AdminPage() {
  const admin = useSelector((store) => store.admin);
  const user = useSelector((store) => store.user);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_USER_LIST' });
  }, []);
  console.log(admin);
  return (
    <AdminUserView
      admin={admin}
    />
  )
}

export default AdminPage;
