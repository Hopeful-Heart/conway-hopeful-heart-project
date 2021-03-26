import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import whiteTitle from "./whitetitle.png";

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
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
  });

  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Link to="/landing">
          <img style={{ height: 75 }} src={whiteTitle}></img>
        </Link>
        <div>
          <Button color="secondary" component={Link} to={loginLinkData.path}>
            {loginLinkData.text}
          </Button>

          {user.id && user.approved_user === true && (
            <>
              <Button color="secondary" component={Link} to="/events">
                Events
              </Button>

              <Button color="secondary" component={Link} to="/allusers">
                All Users
              </Button>

              {user.admin_user && (
                <Button color="secondary" component={Link} to="/admin">
                  Admin
                </Button>
              )}
            </>
          )}

          {user.id && (
            <>
              <Button
                color="secondary"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Log Out
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
