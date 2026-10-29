import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/comingSoon.css';
import poster1 from "../img/spider-man-no-way-home-imax-poster.png";



export default class ComingSoon extends Component {
    render() {
        return (
            <>
                <div className="container-fluid my-3">
                    <section >
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <div className="row">
                                    {[...Array(8)].map((e, i) =>
                                        <div className="col-md-3 px-3 my-3" key={i}>
                                            {/* <Link to="/movie/{i}"> */}
                                            <div className="card h-100">
                                                <div className="pt-3 pb-4 text-center h-100">
                                                    <div className="poster-frame-holder mb-2">
                                                        <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                        <img className="img-fluid col-md-6 align-middle" src={poster1} alt="movie name" />
                                                    </div>
                                                    <div className="trailer-frame-holder">
                                                        <Link to={{ pathname: "https://www.youtube.com/watch?v=rt-2cxAiPJk" }} target="_blank" className="btn btn-outline-primary mt-0">
                                                            <i className="fa fa-play"></i> Trailer
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* </Link> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}
