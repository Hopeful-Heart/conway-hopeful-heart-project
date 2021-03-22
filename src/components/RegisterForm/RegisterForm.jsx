import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pic, setPic] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        city: city,
        state: state,
        pic: pic,
      },
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
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="Last Name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="phone">
          Phone Number:
          <input
            type="text"
            name="Phone Number"
            value={phone}
            required
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="city">
          City (Optional):
          <input
            type="text"
            name="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="state">
          State:
          <input
            type="text"
            name="State"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="profile-pic">
          Profile Picture:
          <input
            type="text"
            name="Profile Pic"
            value={pic}
            required
            onChange={(event) => setPic(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
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
