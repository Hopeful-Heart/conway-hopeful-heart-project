import { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import HomePage from "../HomePage/HomePage";
import EventsPage from "../EventsPage/EventsPage";
import AllUsersPage from "../AllUsersPage/AllUsersPage";
import AdminPage from "../AdminPage/AdminPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import PendingPage from "../PendingPage/PendingPage";
import Messaging from "../Messaging/Messaging";
import Notifications from "../Notifications/Notifications";
import UserDetails from "../AllUsersPage/userDetails";
import Connections from "../Connections/Connections";
import { ToastContainer } from "react-toastify";
import "./App.css";

import { CssBaseline } from "@material-ui/core";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  const dispatch = useDispatch();

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Avenir",
    },
    palette: {
      primary: {
        main: "#553959",
      },
      secondary: {
        main: "#fafafa",
      },
    },
  });

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
      });
  }

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Router>
          <>
            <Nav />
            <br />
            <br />
            <br />
            <div id="content">
              {/* <Fragment>
                <ToastContainer autoClose={2000} position="top-center" />
              </Fragment>
              <Notifications /> */}
              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/landing */}
                <Redirect exact from="/" to="/landing" />

                {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the HomePage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
                <ProtectedRoute
                  // logged in shows HomePage else shows LoginPage
                  exact
                  path="/home"
                >
                  <HomePage />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows EventsPage else shows LoginPage
                  exact
                  path="/events"
                >
                  <EventsPage />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows AllUsersPage else shows LoginPage
                  exact
                  path="/allusers"
                >
                  <AllUsersPage />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows Connections else shows LoginPage
                  exact
                  path="/connections"
                >
                  <Connections />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows Messaging else shows LoginPage
                  exact
                  path="/messaging"
                >
                  <Messaging />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows UserDetails else shows LoginPage
                  exact
                  path="/userdetails"
                >
                  <UserDetails />
                </ProtectedRoute>

                <ProtectedRoute
                  // logged in shows AdminPage else shows LoginPage
                  exact
                  path="/admin"
                >
                  <AdminPage />
                </ProtectedRoute>

                {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/home"
                  // - else shows LoginPage at /login
                  exact
                  path="/login"
                  authRedirect="/home"
                >
                  <LoginPage />
                </ProtectedRoute>

                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/home"
                  // - else shows RegisterPage at "/registration"
                  exact
                  path="/registration"
                  authRedirect="/home"
                >
                  <RegisterPage />
                </ProtectedRoute>

                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/home"
                  // - else shows LandingPage at "/landing"
                  exact
                  path="/landing"
                  authRedirect="/home"
                >
                  <LandingPage />
                </ProtectedRoute>

                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/home"
                  // - else shows PendingPage at "/pending"
                  exact
                  path="/pending"
                  authRedirect="/home"
                >
                  <PendingPage />
                </ProtectedRoute>

                {/* If none of the other routes matched, we will show a 404. */}
                <Route>
                  <h1>404</h1>
                </Route>
              </Switch>
            </div>
            <Footer />
          </>
        </Router>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
