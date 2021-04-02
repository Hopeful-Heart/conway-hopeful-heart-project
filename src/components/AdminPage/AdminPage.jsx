import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminUserView from './adminUserView';
import AdminEventView from './adminEventView';
import Messaging from "../Messaging/Messaging";
import SendMessage from "../SendMessage/SendMessage";
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
  const [defaultAdminView, setDefaultAdminView] = useState(true);
  const [messagingAdminView, setMessagingAdminView] = useState(false);
  const [adminUserView, setAdminUserView] = useState(false);
  const [adminEventView, setAdminEventView] = useState(false);
  useEffect(() => {
    dispatch({ type: 'FETCH_USER_LIST' });
    dispatch({ type: 'FETCH_EVENTS_LIST' });
    dispatch({ type: 'FETCH_ADMIN_USERS' });
    !adminUser && history.push('/home');
  }, []);
  const handleUserClick = () => {
    setDefaultAdminView(false);
    setAdminUserView(true);
  }
  const handleEventClick = () => {
    setDefaultAdminView(false);
    setAdminEventView(true);
  }
  const handleMessagingClick = () => {
    setDefaultAdminView(false);
    setMessagingAdminView(true);
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        {defaultAdminView &&
          <>
            <h1 style={{ textAlign: "center" }}>Admin Page</h1>
            <Button onClick={handleUserClick}>Users</Button>
            <br />
            <br />
            <Button onClick={handleEventClick}>Events</Button>
            <br />
            <br />
            <Button onClick={handleMessagingClick}>Messaging</Button>
          </>
        }
        {messagingAdminView && <div ><Messaging /> <SendMessage /></div>}
        {adminUserView && <AdminUserView admin={admin} superAdmin={superAdmin} />}
        {adminEventView && <AdminEventView admin={admin} superAdmin={superAdmin} />}
      </div>
    </div>
  )
}

export default AdminPage;
