import React, { useState, useEffect } from 'react'
import { useParams, useNavigate  } from 'react-router-dom'
import Axios from "axios";
import * as moment from 'moment'

export default function MovieUpdate() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [trailer, setTrailer] = useState();
    const { movieId } = useParams();
    //const [selectedMovie, setSelectedMovie] = useState([]);//useState(movies[showId-1])
    useEffect(() => {
        const getMovieDetail = () => {
            Axios.get(`/movie-detail/${movieId}`).then((response) => {
                setName(response.data[0].name)
                setTrailer(response.data[0].trailer)
                let yourDate = new Date(response.data[0].releaseDate)
                setDate(moment(yourDate).format('YYYY-MM-DD'))
            });
        }
        getMovieDetail();
    }, [movieId]);



    // let history = useHistory();
    let navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        if (!name || !date || !trailer) {
            alert("Any field can't be blank");
        } else {
            Axios.put(`/update-movie/${movieId}`, {
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
