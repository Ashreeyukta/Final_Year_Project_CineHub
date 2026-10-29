import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { postRequest } from "../../../services/http.service";

export function Register() {
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
            postRequest('signup', {
                fname: fname, lname: lname, email: email, password: password,
            });
            setSignUpData([...signUpData, { fname: fname, lname: lname }]);
            setFname("");
            setLname("");
            setEmail("");
            setPassword("");
            navigate("/login");
        }
    };
    return (
        <>
            <div className="container">
                <div className="row p-4">
                    <div className="offset-md-1 card col-md-10 p-5">
                        <div className="">
                            <form onSubmit={submit}>
                                <h3>Sign Up</h3>
                                <hr />
                                <div className="form-group row mb-3">
                                    <label className="form-label">First name</label>
                                    <input type="text" name="fname" className="form-control form-control-sm" placeholder="First name" value={fname} onChange={(e) => { setFname(e.target.value); }} />
                                </div>
                                <div className="form-group row mb-3">
                                    <label className="form-label">Last name</label>
                                    <input type="text" name="lname" className="form-control form-control-sm" placeholder="Last name" value={lname} onChange={(e) => { setLname(e.target.value); }} />
                                </div>
                                <div className="form-group row mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" name="email" className="form-control form-control-sm" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                                </div>
                                <div className="form-group row mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control form-control-sm" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
                                </div>


                                <button className="btn btn-primary btn-block">
                                    Sign Up
                                </button>

                                <p className="forgot-password text-right">
                                    Already registered <NavLink to="/login">sign in?</NavLink>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}