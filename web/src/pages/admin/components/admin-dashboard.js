import { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NavLink } from "react-router-dom";
import { deleteRequest, getRequest } from "../../../services/http.service";

export function AdminDashboard() {
    // console.log("AdminHere");
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getRequest(`/all-movie`).then((response) => {
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
                        deleteRequest(`/delete-all-movie/${movieId}`)
                            .then((res) => {
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
            <div className="mx-md-4 px-md-4 py-4 mt-md-4" >
                <div className="row">

                    <h1 className='text-center title-red'>Movie List</h1>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-right">
                                <NavLink to={{ pathname: `/admin/add-movie` }} className="btn btn-danger mt-0">Add</NavLink>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row admin-list">

                    <div className="col-12 table-responsive">
                        <table className="table table-striped mx-0 px-2 table-hover table-bordered">
                            <thead className="table-dark border-bottom">
                                <tr>
                                    <th  scope="col">S.N.</th>
                                    <th  scope="col">Name</th>
                                    <th  scope="col">Trailer</th>
                                    <th  scope="col">Released Date</th>
                                    <th  scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    userList.map((val, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="text-white">{++i}</td>
                                                <td className="text-white">{val.name}</td>
                                                <td className="text-white">{val.trailer}</td>
                                                <td className="text-white">{new Date(val.releaseDate).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                                <td className="text-center text-white">
                                                    <NavLink to={{ pathname: `/admin/movie-detail/${val.id}` }} className="btn btn-sm mt-1 btn-outline-info">View</NavLink>
                                                    <NavLink to={{ pathname: `/admin/movie-update/${val.id}` }} className="btn btn-sm mt-1 btn-outline-success">Update</NavLink>
                                                    <button className="btn btn-sm mt-1 btn-outline-danger" onClick={() => { deleteMovie(val.id, val.name) }}>Remove</button>
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
}