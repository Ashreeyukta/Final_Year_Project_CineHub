import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Axios from "axios";

// https://www.tutsmake.com/create-registration-and-login-form-in-node-js-mysql/
async function loginUser(credentials) {
  // return fetch("/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(credentials),
  // }).then((data) => data.json());

  return Axios.post(`/login`, {
    email: credentials.email, password: credentials.password
  }).then((res) =>
    res.data
  )

}
export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    console.log(token.token);
    if (token.token !== false) {
      setToken(token);
      window.location.href = "/";
    }
    else {
      alert("Incorrect Password");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row p-4">
          <div className="col-md-3"></div>
          <div className="card col-md-6 p-5">
            <div className="">
              <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                <div className="form-group row mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group row mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group row mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
                <p className="forgot-password text-right">
                  Forgot <Link to="/forget-password">password?</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
