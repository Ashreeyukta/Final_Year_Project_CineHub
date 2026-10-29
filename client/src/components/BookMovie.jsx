
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function BookMovie() {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/movie').then((response) => {
            setMovieList(response.data);
        })

    }, []);
    return (
        <div>
            <>
                <div className="container-fluid my-3">
                    <section >
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <div className="row">
                                    {movieList.map((val) =>

                                        <div className="col-md-3 px-3 my-3" key={val.id} title={val.name}>
                                            <Link to={"/movie/" + val.id}>
                                            <div className="card h-100">
                                                <div className="pt-3 pb-4 text-center h-100">
                                                    <div className="poster-frame-holder mb-2">
                                                        <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                        <img className="img-fluid col-md-6 align-middle" src={val.trailer} alt={val.name} />

                                                    </div>
                                                    <div className="trailer-frame-holder">
                                                        <span className="btn btn-outline-primary mt-0">
                                                            {/* <i className="fa fa-play"> </i> */}
                                                            Show Time {val.showingTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                            {val.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </section>
                </div>
            </>
            <div className="card mx-4 px-4 py-4 mt-4 d-none" >
                <h1 className='text-center bg-info'>Food List</h1>
                <table className="table table-striped mx-0 px-2 tabel-">
                    <thead>
                        <tr className='m-0 p-0'>
                            <th scope="col">Food Item</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty.</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movieList.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.name}</td>
                                    <td>{val.price}</td>
                                    {/* <td><input type="number" name={"itemAmt" + val.id} id={"itemAmt" + val.id} required onChange={(e) => { setItemAmt(e.target.value); }} /></td> */}
                                    <td>
                                        {/* <div className="btn btn-primary btn-round " onClick={doAddItems.bind(val.id)}></div> */}
                                        {/* <button onClick={() => { doAddItems(val.id, val.itemName) }} >Add</button> */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
