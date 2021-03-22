import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    pic: "",
  });

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: newUser,
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="First Name"
            value={newUser.firstName}
            required
            onChange={(event) =>
              setNewUser({ ...newUser, firstName: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="Last Name"
            value={newUser.lastName}
            required
            onChange={(event) =>
              setNewUser({ ...newUser, lastName: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="phone">
          Phone Number:
          <input
            type="text"
            name="Phone Number"
            value={newUser.phone}
            required
            onChange={(event) =>
              setNewUser({ ...newUser, phone: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="city">
          City (Optional):
          <input
            type="text"
            name="City"
            value={newUser.city}
            onChange={(event) =>
              setNewUser({ ...newUser, city: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="state">
          State:
          <input
            type="text"
            name="State"
            value={newUser.state}
            required
            onChange={(event) =>
              setNewUser({ ...newUser, state: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="profile-pic">
          Profile Picture:
          <input
            type="text"
            name="Profile Pic"
            value={newUser.pic}
            required
            onChange={(event) =>
              setNewUser({ ...newUser, pic: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            required
            onChange={(event) =>
              setNewUser({ ...newUser, email: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            required
            onChange={(event) =>
              setNewUser({ ...newUser, password: event.target.value })
            }
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
