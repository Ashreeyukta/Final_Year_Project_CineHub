import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "axios";

export default function BookSeat() {
    const { showId } = useParams();
    //For Shows
    // const [selectedMovie, setSelectedMovie] = useState([]);//useState(movies[showId-1])
    // useEffect(() => {
    //     Axios.get(`http://localhost:3001/api/movie/${showId}`).then((response) => {
    //         setSelectedMovie(response.data)
    //     })
    // });
    
    const [selectedMovie, setSelectedMovie] = useState([]);//useState(movies[showId-1])
    useEffect(() => {
        Axios.get(`/movie-detail/${showId}`).then((response) => {
            setSelectedMovie(response.data)
        })
    });





    return (
        <>
            <div className="container">
                {
                    selectedMovie.map((val) => {
                        return (
                            <div key={val.id}>
                                <div className="row mt-2">
                                    <iframe width="560" height="315" src={val.trailer} title={val.name} frameBorder="0" allowFullScreen></iframe>
                                </div>
                                <h1>{val.name}</h1>
                                {val.description}
                            </div>
                        )
                    })
                }
            </div>
        </>
    );

}
