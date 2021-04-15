import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import whiteTitle from "./whitetitle.png";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";
import {
  Button,
  makeStyles,
  AppBar,
  Toolbar,
  useMediaQuery,
  IconButton,
  Drawer,
  Popover,
  Paper,
  MenuList,
  MenuItem,
} from "@material-ui/core";

import "./Nav.css";

import MenuIcon from "@material-ui/icons/Menu";

function Nav() {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const routeMatch = useRouteMatch("/landing");
  const desktopView = useMediaQuery("(min-width:950px)");

  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };

  if (user.id != null) {
    loginLinkData.path = "/home";
    loginLinkData.text = "Home";
  }

  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawer: {
      width: `fit-content`,
    },
    drawerPaper: {
      width: `fit-content`,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar}>
        <Fragment>
          <ToastContainer autoClose={2000} position="top-center" />
        </Fragment>
        <Toolbar className={classes.toolbar}>
          <Link to="/landing">
            <img style={{ height: "3rem" }} src={whiteTitle}></img>
          </Link>

          {/* Landing page scroll naviagtion */}

          {desktopView ? (
            <>
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
                    offset={-50}
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
                    offset={-50}
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
                    offset={-50}
                  >
                    Learn More
                  </Button>
                </div>
              )}

              {/* Non-landing page navigation */}

              {!routeMatch ? (
                <div>
                  <Button
                    color="secondary"
                    component={Link}
                    to={loginLinkData.path}
                  >
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

                      <Button
                        color="secondary"
                        component={Link}
                        to="/connections"
                      >
                        Connections
                      </Button>

                      <Button color="secondary" component={Link} to="/landing">
                        About
                      </Button>

                      {user.admin_user && (
                        <Button color="secondary" component={Link} to="/admin">
                          Admin
                        </Button>
                      )}
                    </>
                  )}

                  {user.id && (
                    <Button
                      color="secondary"
                      onClick={() => dispatch({ type: "LOGOUT" })}
                    >
                      Log Out
                    </Button>
                  )}
                </div>
              ) : (
                // app menu navigation for the landing page
                <>
                  <IconButton
                    color="secondary"
                    onClick={(e) => setAnchorEl(e.target)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Popover
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Paper>
                      <MenuList>
                        <MenuItem
                          component={Link}
                          onClick={() => setAnchorEl(null)}
                          to={loginLinkData.path}
                        >
                          {loginLinkData.text}
                        </MenuItem>

                        {user.id && user.approved_user === true && (
                          <div>
                            <MenuItem
                              color="secondary"
                              component={Link}
                              onClick={() => setAnchorEl(null)}
                              to="/events"
                            >
                              Events
                            </MenuItem>

                            <MenuItem
                              color="secondary"
                              component={Link}
                              onClick={() => setAnchorEl(null)}
                              to="/allusers"
                            >
                              All Users
                            </MenuItem>

                            <MenuItem
                              color="secondary"
                              component={Link}
                              onClick={() => setAnchorEl(null)}
                              to="/connections"
                            >
                              Connections
                            </MenuItem>

                            <MenuItem
                              color="secondary"
                              component={Link}
                              onClick={() => setAnchorEl(null)}
                              to="/landing"
                            >
                              About
                            </MenuItem>

                            {user.admin_user && (
                              <MenuItem
                                color="secondary"
                                component={Link}
                                onClick={() => setAnchorEl(null)}
                                to="/admin"
                              >
                                Admin
                              </MenuItem>
                            )}
                          </div>
                        )}

                        {user.id && (
                          <MenuItem
                            color="secondary"
                            onClick={() => {
                              dispatch({ type: "LOGOUT" });
                              setAnchorEl(null);
                            }}
                          >
                            Log Out
                          </MenuItem>
                        )}
                      </MenuList>
                    </Paper>
                  </Popover>
                </>
              )}
            </>
          ) : (
            <IconButton
              color="secondary"
              onClick={() =>
                !toggleDrawer ? setToggleDrawer(true) : setToggleDrawer(false)
              }
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Navigation within a drawer */}

      <Drawer
        open={toggleDrawer}
        anchor="right"
        onClose={() => setToggleDrawer(false)}
        variant="persistent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div id="drawer-content">
          {routeMatch && routeMatch.path === "/landing" && (
            <>
              <Button
                color="primary"
                component={ScrollLink}
                to="welcome"
                activeClass="active"
                spy={true}
                smooth={true}
                duration={1000}
                offset={-50}
                onClick={() => setToggleDrawer(false)}
              >
                Welcome
              </Button>

              <Button
                color="primary"
                component={ScrollLink}
                to="aboutapp"
                activeClass="active"
                spy={true}
                smooth={true}
                duration={1000}
                offset={-50}
                onClick={() => setToggleDrawer(false)}
              >
                About This App
              </Button>

              <Button
                color="primary"
                component={ScrollLink}
                to="learnmore"
                activeClass="active"
                spy={true}
                smooth={true}
                duration={1000}
                offset={-50}
                onClick={() => setToggleDrawer(false)}
              >
                Learn More
              </Button>
            </>
          )}

          <Button
            color="primary"
            component={Link}
            to={loginLinkData.path}
            onClick={() => setToggleDrawer(false)}
          >
            {loginLinkData.text}
          </Button>

          {user.id && user.approved_user === true && (
            <>
              <Button
                color="primary"
                component={Link}
                to="/events"
                onClick={() => setToggleDrawer(false)}
              >
                Events
              </Button>

              <Button
                color="primary"
                component={Link}
                to="/allusers"
                onClick={() => setToggleDrawer(false)}
              >
                All Users
              </Button>

              <Button
                color="primary"
                component={Link}
                to="/connections"
                onClick={() => setToggleDrawer(false)}
              >
                Connections
              </Button>

              {user.admin_user && (
                <Button
                  color="primary"
                  component={Link}
                  to="/admin"
                  onClick={() => setToggleDrawer(false)}
                >
                  Admin
                </Button>
              )}
            </>
          )}

          {user.id && (
            <Button
              color="primary"
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                setToggleDrawer(false);
              }}
            >
              Log Out
            </Button>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default Nav;
