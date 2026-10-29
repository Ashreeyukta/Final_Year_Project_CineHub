import React, { useState } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";

export const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpData, setSignUpData] = useState([]);

  // const history = useHistory();
  const navigate = useNavigate();


  const submit = (e) => {
    e.preventDefault();
    if (!fname || !lname || !email || !password) {
      alert("Any field can't be blank");
    } else {
      Axios.post('http://localhost:3001/api/signup', {
        fname: fname, lname: lname, email: email, password: password,
      });
      setSignUpData([...signUpData, { fname: fname, lname: lname }]);
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      navigate("/login");

      // history.push("/login");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row p-4">
          <div className="col-md-3"></div>
          <div className="card col-md-6 p-5">
            <div className="">
              <form onSubmit={submit}>
                <h3>Sign Up</h3>
                <div className="form-group">
                  <label>First name</label>
                  <input type="text" name="fname" className="form-control" placeholder="First name" value={fname} onChange={(e) => { setFname(e.target.value); }} />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input type="text" name="lname" className="form-control" placeholder="Last name" value={lname} onChange={(e) => { setLname(e.target.value); }} />
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" name="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
                </div>
                <button className="btn btn-primary btn-block">
                  Sign Up
                </button>
                <p className="forgot-password text-right">
                  Already registered <Link to="/login">sign in?</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  )
};
