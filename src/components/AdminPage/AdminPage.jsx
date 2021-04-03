import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminUserView from './adminUserView';
import AdminEventView from './adminEventView';
// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AdminPage() {

  const admin = useSelector((store) => store.admin);
  const adminUser = useSelector((store) => store.user.admin_user)
  const superAdmin = useSelector((store) => store.user.super_admin);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(superAdmin);
  useEffect(() => {
    dispatch({ type: 'FETCH_USER_LIST' });
    dispatch({ type: 'FETCH_EVENTS_LIST' });
    dispatch({ type: 'FETCH_ADMIN_USERS' });
    !adminUser && history.push('/home');
  }, []);

  return (
    <>
      <AdminUserView
        admin={admin}
        superAdmin={superAdmin}
      />
      <AdminEventView
        admin={admin}
        superAdmin={superAdmin}
      />
    </>
  )
}

export default AdminPage;
