import React, { useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

async function loginUser(credentials) {
  return Axios.post(`/admin`, {
    email: credentials.email, password: credentials.password
  }).then((res) =>
    res.data
  )
}
export default function Login({ setToken }) {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    if (token.token !== false) {
      setToken(token);
      navigate("/admin/dashboard")
      // window.location.href = "/";
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
                <div className="form-group mb-3">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
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
