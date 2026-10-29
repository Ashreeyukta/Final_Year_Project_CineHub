import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function User(params) {
    console.log("AdminHere");
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        Axios.get(`/all-movie`).then((response) => {
            setUserList(response.data);
        })
    }, []);

    const deleteMovie = (movieId, movieName) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Do you really want to delete ' + movieName + " ?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Axios.delete(`/delete-all-movie/${movieId}`).then((res) => {
                            if (!res.data) {
                                alert("fail");
                            } else {
                                alert("success");
                                window.location.reload(false);
                            }
                        }, [setUserList])
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Cancled')
                }
            ]
        });
    };
    return (
        <>
            <div>
                <div className="card mx-md-4 px-md-4 py-4 mt-md-4" >
                    <h1 className='text-center bg-info'>Movie List</h1>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-right">
                                <Link to={{ pathname: `/add-movie` }} className="btn btn-outline-danger mt-0">Add</Link>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped mx-0 px-2 table-hover">
                            <thead>
                                <tr className='m-0 p-0'>
                                    <th scope="col">S.N.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Trailer</th>
                                    <th scope="col">Released Date</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    userList.map((val, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{++i}</td>
                                                <td>{val.name}</td>
                                                <td>{val.trailer}</td>
                                                <td>{new Date(val.releaseDate).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                                <td className="text-center bg-transparent table-borderless border-0">
                                                    <div className="bg-transparent d-table-row">
                                                        <div className="d-table-cell px-1">
                                                            <Link to={{ pathname: `/movie-detail/${val.id}` }} className="btn btn-outline-success mt-0">View</Link>
                                                        </div>

                                                        <div className="d-table-cell px-1">
                                                            <Link to={{ pathname: `/movie-update/${val.id}` }} className="btn btn-outline-primary mt-0">Update</Link>
                                                        </div>
                                                        <div className="d-print-table-cell px-1">
                                                            <button className="btn btn-outline-danger mt-0" onClick={() => { deleteMovie(val.id, val.name) }}>Remove</button>
                                                        </div>
                                                    </div>
                                                </td>
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
};
