import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Dashboard() {
    console.log("Here");
    
    var json = sessionStorage.getItem("token");
    if (json) {
        var data = JSON.parse(json);
        if (data) {
            var userId = data.id;
        }
    }
    const [selectedMovie, setSelectedMovie] = useState([]);
    
    useEffect(() => {
        Axios.get(`http://localhost:3001/api/my-movie/${userId}`).then(
            (response) => {
                setSelectedMovie(response.data);
            }
        );
    }, );
    return (
        <>
            <div>
                <div className="card mx-4 px-4 py-4 mt-4" >
                    <h1 className='text-center bg-info'>Booked Movie List</h1>
                    <table className="table table-striped mx-0 px-2 tabel-">
                        <thead>
                            <tr className='m-0 p-0'>
                                <th scope="col">S.N.</th>
                                <th scope="col">Movie Name</th>
                                <th scope="col">Seat No.</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedMovie.map((val, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{++i}</td>
                                        <td>{val.name}</td>
                                        <td>{val.seatId + 1}</td>
                                        <td>{new Date(val.showingDate).toLocaleString("en-US", {year:"2-digit", month: "long" , day : '2-digit'}) + ''}</td>
                                        <td>{val.showingTime}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
