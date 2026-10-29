import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/comingSoon.css';
import logo from "../logo.svg";



export default class NowShowing extends Component {
    render() {
        return (
            <>
                <div className="container-fluid my-3">
                    <section className="container" id="cinema-info">
                        <div className="col-12">
                            <div id="ticket-info" className="row text-center">
                                <div className="col-md-4 col-sm-offset-0 col-md-offset-2">
                                    <h3>Show Times For</h3>
                                </div>
                                <div className="col-md-4">
                                    <div className="btn-group"><button type="button" className="btn btn-block outline dropdown-toggle stbu" id="dropMenuDate" data-toggle="dropdown" aria-expanded="true">Sunday, February 06 <span className="caret"></span></button>
                                        <ul className="dropdown-menu dateList" role="menu" aria-labelledby="dropMenuDate">
                                            <li className="disabled">
                                                <Link tabindex="-1" href="?vdate=2/6/2022#todays-shows">Sunday, February 06</Link>
                                            </li>
                                            <li>
                                                <Link tabindex="-1" href="?vdate=2/7/2022#todays-shows">Monday, February 07</Link>
                                            </li>
                                            <li>
                                                <Link tabindex="-1" href="?vdate=2/8/2022#todays-shows">Tuesday, February 08</Link>
                                            </li>
                                            <li>
                                                <Link tabindex="-1" href="?vdate=2/9/2022#todays-shows">Wednesday, February 09</Link>
                                            </li>
                                            <li>
                                                <Link tabindex="-1" href="?vdate=2/10/2022#todays-shows">Thursday, February 10</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section >
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <div className="row">
                                    {/* don't */}
                                    <div className="col-md-3  px-3 my-3 d-none">
                                        <div className="card h-100">
                                            <div className="pt-3 pb-4 px-2 text-center">
                                                <img className="img-fluid col-md-6 " src="http://img.cnmhstng.com/images/2021/SpiderMan_No_Way_Home755.jpg" alt="movie name" />
                                                <Link to={{ pathname: "https://www.youtube.com/embed/-ezfi6FQ8Ds" }} target="_blank" className="btn btn-outline-primary mt-3">
                                                    <i className="fa fa-play"></i> Trailer1
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* now */}
                                    <div className="col-md-3  px-3 my-3">
                                        <Link to="/movie">
                                            <div className="card h-100">
                                                <div className="pt-3 pb-4 px-2 text-center h-100">
                                                    <div className="poster-frame-holder">
                                                        <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                        <img className="img-fluid col-md-6  align-middle" src={logo} alt="movie name" />
                                                    </div>
                                                    {/* <hr /> */}
                                                    <div className="trailer-frame-holder">
                                                        <Link to={{ pathname: "https://www.youtube.com/watch?v=rt-2cxAiPJk" }} target="_blank" className="btn btn-outline-primary mt-0">
                                                            <i className="fa fa-play"></i> Trailer
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3  px-3 my-3">
                                        <Link to="/movie">
                                            <div className="card h-100">
                                                <div className="pt-3 pb-4 px-2 text-center h-100">
                                                    <div className="poster-frame-holder mb-2">
                                                        <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                        <img className="img-fluid col-md-6 align-middle" src="http://img.cnmhstng.com/images/2021/SpiderMan_No_Way_Home755.jpg" alt="movie name" />
                                                    </div>
                                                    <div className="trailer-frame-holder">
                                                        <Link to={{ pathname: "https://www.youtube.com/watch?v=rt-2cxAiPJk" }} target="_blank" className="btn btn-outline-primary mt-0">
                                                            <i className="fa fa-play"></i> Trailer
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-3  px-3 my-3">
                                        <div className="card h-100">
                                            <div className="pt-3 pb-4 px-2 text-center h-100">
                                                <div className="poster-frame-holder">
                                                    <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                    <img className="img-fluid col-md-6  align-middle" src={logo} alt="movie name" />
                                                </div>
                                                <div className="trailer-frame-holder">
                                                    <Link to={{ pathname: "https://www.youtube.com/watch?v=rt-2cxAiPJk" }} target="_blank" className="btn btn-outline-primary mt-0">
                                                        <i className="fa fa-play"></i> Trailer
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3   px-3 my-3">
                                        <div className="card h-100">
                                            <div className="pt-3 pb-4 text-center h-100">
                                                <div className="poster-frame-holder mb-2">
                                                    <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                    <img className="img-fluid col-md-6 align-middle" src="" alt="movie name" />
                                                </div>
                                                <div className="trailer-frame-holder">
                                                    <Link to={{ pathname: "https://www.youtube.com/watch?v=rt-2cxAiPJk" }} target="_blank" className="btn btn-outline-primary mt-0">
                                                        <i className="fa fa-play"></i> Trailer
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
