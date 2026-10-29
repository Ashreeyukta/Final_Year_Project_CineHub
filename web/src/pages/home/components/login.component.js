import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../../helpers/utilities";
import { postRequest } from "../../../services/http.service";

import {toast} from "react-toastify";

export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        let token = getToken();
        if(token){
            navigate('/dashboard')
        }
    }, []) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await postRequest('login', {
            email,
            password,
        });

        if (token.data.token) {
            setToken(token);
            toast.success("Welcome to user panel.");
            navigate('/dashboard');
        }
        else {
            toast.error("Credentials does not match");
        }
    };
    return (
        <>
            <div className="container mt-5 py-5">
                <div className="row p-4">

                    <div className="offset-md-3 offset-sm-1 card col-md-6 col-sm-10 p-5">
                        <div className="">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-white">Sign In</h3>
                                <div className="form-group row mb-3">
                                    <label className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group row mb-3">
                                    <label className="form-label">Password</label>
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
                                            className="custom-control-label text-white"
                                            htmlFor="customCheck1"
                                        >
                                            &nbsp;
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary login-btn">
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