import React, { useEffect } from "react";
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
import OtherUserDetailsPage from "../OtherUserDetailsPage/OtherUserDetailsPage";
import AdminPage from "../AdminPage/AdminPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import PendingPage from "../PendingPage/PendingPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    dispatch({ type: "FETCH_APPROVED_EVENTS" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
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
            // logged in shows OtherUserDetailsPage else shows LoginPage
            exact
            path="/otheruserdetails"
          >
            <OtherUserDetailsPage />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
