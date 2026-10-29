import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function User(params) {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        Axios.get(`/user`).then((response) => {
            setUserList(response.data);
        })
    }, []);
    return (
        <>
            <div>
                <div className="card mx-4 px-4 py-4 mt-4" >
                    <h1 className='text-center bg-info'>User List</h1>
                    <table className="table table-striped mx-0 px-2 tabel-">
                        <thead>
                            <tr className='m-0 p-0'>
                                <th scope="col">S.N.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Register Date Time</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                userList.map((val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{val.fname+" "+val.lname}</td>
                                            <td>{val.email}</td>
                                            <td>{new Date(val.date).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
};
