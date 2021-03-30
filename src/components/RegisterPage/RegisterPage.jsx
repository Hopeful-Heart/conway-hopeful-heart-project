import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="container">
      <RegisterForm />
      <center>
        <Button
          color="primary"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
