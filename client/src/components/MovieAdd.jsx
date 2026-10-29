import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios";

export default function MovieUpdate() {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [trailer, setTrailer] = useState();
    const [description, setDescription] = useState();

    let navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        if (!name || !date || !trailer) {
            alert("Any field can't be blank");
        } else {
            Axios.post(`/add-new-movie`, {
                name: name, date: date, trailer: trailer, description: description
            }).then((res) => {
                if (!res.data) {
                    alert("fail");
                } else {
                    alert("success");
                }
                navigate(-1);
                // history.goBack()
            },
            );
        }
    };
    return (
        <>
            <div className="mx-md-4 px-md-4 py-md-4 mt-1 mt-md-2">
                <h1 className='text-center bg-info'>Add Movie</h1>
                <div className="container-fluid my-md-3 ">
                    <div className="row p-md-4">
                        <div className="col-md-3"></div>
                        <div className="card col-md-6 p-5">
                            <div className="">
                                <form onSubmit={submit} method="POST">
                                    <div className="form-group">
                                        <label>Movie</label>
                                        <input type="text" autoComplete='off' name="moviename" className="form-control" placeholder="Movie" onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label>Release Date</label>
                                        <input type="Date" name="release" className="form-control" placeholder="Release Date" onChange={(e) => { setDate(e.target.value); }} />
                                    </div>
                                    <div className="form-group">
                                        <label>Trailer</label>
                                        <input type="text" autoComplete='off' name="trailer" className="form-control" placeholder="iFrame Link only" onChange={(e) => { setTrailer(e.target.value); }} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea autoComplete='off' name="description" className="form-control" placeholder="Description" onChange={(e) => { setDescription(e.target.value); }} />
                                    </div>
                                    <button className="btn btn-success btn-block">Add</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </>
    );
}