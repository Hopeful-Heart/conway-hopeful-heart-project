import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import LoginForm from "../LoginForm/LoginForm";

function LoginPage() {
  const history = useHistory();

  return (
    <div className="container">
      <LoginForm />
      <center>
        <Button
          color="primary"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
