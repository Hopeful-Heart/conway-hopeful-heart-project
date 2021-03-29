import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import whiteTitle from "./whitetitle.png";

import { Button, makeStyles, AppBar, Toolbar } from "@material-ui/core";

import "./Nav.css";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const routeMatch = useRouteMatch("/landing");

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
      display: "flex",
      justifyContent: "space-between",
    },
  });

  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Link to="/landing">
          <img style={{ height: 60 }} src={whiteTitle}></img>
        </Link>

        {routeMatch && routeMatch.path === "/landing" && (
          <div>
            <Button
              color="secondary"
              component={ScrollLink}
              to="welcome"
              activeClass="active"
              spy={true}
              smooth={true}
              duration={1000}
              offset={-90}
            >
              Welcome
            </Button>

            <Button
              color="secondary"
              component={ScrollLink}
              to="aboutapp"
              activeClass="active"
              spy={true}
              smooth={true}
              duration={1000}
              offset={-90}
            >
              About This App
            </Button>

            <Button
              color="secondary"
              component={ScrollLink}
              to="learnmore"
              activeClass="active"
              spy={true}
              smooth={true}
              duration={1000}
              offset={-90}
            >
              Learn More
            </Button>
          </div>
        )}

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

              <Button color="secondary" component={Link} to="/connections">
                Connections
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
