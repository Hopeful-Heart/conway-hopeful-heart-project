import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import whiteTitle from './whitetitle.png'

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/landing">
        <img style={{height:75}} src={whiteTitle}></img>
        {/* <h2 className="nav-title">Hope Heart Project: Family Connections</h2> */}
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && user.approved_user === true && (
          <>
            <Link className="navLink" to="/events">
              Events
            </Link>

            <Link className="navLink" to="/allusers">
              All Users
            </Link>
          </>
        )}

        {user.id && (
          <>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
