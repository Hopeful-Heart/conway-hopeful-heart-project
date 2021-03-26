import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import whiteTitle from "./whitetitle.png";

import "./Nav.css";

import { Button, makeStyles, AppBar, Toolbar } from "@material-ui/core";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };

  if (user.id != null) {
    loginLinkData.path = "/home";
    loginLinkData.text = "Home";
  }

  const useStyles = makeStyles({
    navLink: {

    }
  });

  const classes = useStyles();

  return (
    <div className="nav">
      <Link to="/landing">
        <img style={{ height: 75 }} src={whiteTitle}></img>
      </Link>
      <div>
        <Button color='secondary' component={Link} to={loginLinkData.path}>
          {loginLinkData.text}
        </Button>

        {user.id && user.approved_user === true && (
          <>
            <Button color='secondary' component={Link} to="/events">
              Events
            </Button>

            <Button color='secondary' component={Link} to="/allusers">
              All Users
            </Button>
          </>
        )}

        {user.id && (
          <>
            <Button color='secondary' onClick={() => dispatch({ type: "LOGOUT" })}>
              Log Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
