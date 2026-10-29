import React, { useState, useEffect } from 'react'
import { useParams, useNavigate  } from 'react-router-dom'
import * as moment from 'moment'
import { getRequest, updateRequest } from '../../../services/http.service';

export default function MovieUpdate() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [trailer, setTrailer] = useState();
    const { id } = useParams();

    useEffect(() => {
        const getMovieDetail = () => {
            getRequest(`/movie-detail/${id}`).then((response) => {
                console.log(response);
                setName(response.data.movie.name)
                setTrailer(response.data.movie.trailer)
                let yourDate = new Date(response.data.movie.releaseDate)
                setDate(moment(yourDate).format('YYYY-MM-DD'))
            });
        }
        getMovieDetail();
    }, [id]);



    // let history = useHistory();
    let navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        if (!name || !date || !trailer) {
            alert("Any field can't be blank");
        } else {
            updateRequest(`/update-movie/${id}`, {
                name: name, date: date, trailer: trailer
            }).then(alert("updated"), navigate(-1)
            );
        }
    };
    return (
        <>
            <div className="mx-md-4 px-md-4 py-md-4 mt-1 mt-md-2">
                <h1 className='text-center bg-info'>Update</h1>
                <div className="container-fluid my-md-3 ">
                    <div className="row p-md-4">
                        <div className="col-md-3"></div>
                        <div className="card col-md-6 p-5">
                            <div className="">
                                <form onSubmit={submit} method="POST" encType="multipart/form-data">
                                    <div className="form-group">
                                        <label>Movie</label>
                                        <input type="text" name="moviename" className="form-control" placeholder="Movie" value={name} onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label>Release Date</label>
                                        <input type="Date" name="release" className="form-control" placeholder="Release Date" defaultValue={date} onChange={(e) => { setDate(e.target.value); }} />
                                    </div>
                                    <div className="form-group">
                                        <label>Trailer</label>
                                        <input type="text" name="trailer" className="form-control" placeholder="iframe link only" defaultValue={trailer} onChange={(e) => { setTrailer(e.target.value); }} />
                                    </div>
                                    <button className="btn btn-success btn-block">update</button>
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
