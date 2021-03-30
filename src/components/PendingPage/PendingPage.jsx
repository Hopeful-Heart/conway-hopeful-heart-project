import React from "react";
import { useSelector, useDispatch } from "react-redux";

function PendingPages() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <img src={Logo} style={{ width: "20rem" }} />
        <form onReset={() => history.push("/landing")} onSubmit={login}>
          <h2 style={{ fontSize: "2rem", marginTop: ".5rem" }}>Login</h2>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <TextField
            type="email"
            variant="outlined"
            label="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <br />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <br />
          <ButtonGroup>
            <Button variant="outlined" color="primary" type="reset">
              Back to Home
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </form>
      </Paper>
      <br />
      <button
        onClick={() =>
          dispatch({ type: "UPDATE_AUTHORIZED_USER", payload: true })
        }
      >
        Authorize Account
      </button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default PendingPages;
