import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { getRequest } from "../../../services/http.service";

export function UserLists(){
    let [userList, setUserLists] = useState([]);

    useEffect(() => {
        getRequest('/user', true)
        .then((users) => {
            setUserLists(users.data);
        })
        .catch((err) => {
            toast.error("Error while fetching user list")
        })
    }, [])
    
    return (
        <>
        <div className="mx-md-4 px-md-4 py-4 mt-md-4" >
            <div className="row">

                <h1 className='text-center title-red'>User List</h1>
            </div>


            <div className="row admin-list">

                <div className="col-12 table-responsive">
                    <table className="table table-striped mx-0 px-2 table-hover table-bordered">
                        <thead className="table-dark border-bottom">
                            <tr>
                                <th  scope="col">S.N.</th>
                                <th  scope="col">First name</th>
                                <th  scope="col">Last name</th>
                                <th  scope="col">Email</th>
                                <th  scope="col">Registered Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                userList.map((val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-white">{++i}</td>
                                            <td className="text-white">{val.fname}</td>
                                            <td className="text-white">{val.lname}</td>
                                            <td className="text-white">{val.email}</td>
                                            <td className="text-white">{new Date(val.date).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    )
}