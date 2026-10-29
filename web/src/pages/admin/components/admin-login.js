import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminToken, setAdminToken } from "../../../helpers/utilities";
import { postRequest } from "../../../services/http.service";
import { Headers } from "../partials/headers/Adminheaders.component";

export function AdminLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        postRequest("admin",{
            email:email,
            password:password,
        })
        .then((response) => {
            if(response.data.token === false) {
                alert("Incorrect Credentials");
            } else {
                setAdminToken(response.data);
                navigate("/admin");
            }
        }) 
        .catch((err) => {
            console.log("Error: ", err);
            alert(JSON.stringify(err));
        })
        
    };

    useEffect(() => {
        let admin_token = getAdminToken();
        if(admin_token) {
            navigate('/admin');
        }
    }, [])

    return (
        <>
            <Headers isAdmin={true} />
            <div className="container mt-5 py-5">
                <div className="row p-4">
                    <div className="col-md-3"></div>
                    <div className="card col-md-6 p-5">
                        <div className="">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-white">Sign In</h3>
                                <div className="form-group mb-3">
                                    <label className="form-label text-white">Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label text-white">Password</label>
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