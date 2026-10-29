import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <>
            <div className="body-footer-manager"></div>
            <footer className="page-footer font-small special-color-dark bg -dark pt-4 fixed-bottom">
                <div className="container">
                    <ul className="list-unstyled list-inline text-center">
                        <li className="list-inline-item">
                            <Link to={{ pathname: "http://fb.com" }} target="_blank" className="btn-floating btn-fb mx-1">
                                <i className="fab fa-facebook-f"> </i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to={{ pathname: "http://twitter.com" }} target="_blank" className="btn-floating btn-tw mx-1">
                                <i className="fab fa-twitter"> </i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to={{ pathname: "http://google.com" }} target="_blank" className="btn-floating btn-gplus mx-1">
                                <i className="fab fa-google-plus-g"> </i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to={{ pathname: "http://linkedin.com" }} target="_blank" className="btn-floating btn-li mx-1">
                                <i className="fab fa-linkedin-in"> </i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to={{ pathname: "http://dribbble.com" }} target="_blank" className="btn-floating btn-dribbble mx-1" >
                                <i className="fab fa-dribbble"> </i>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-copyright text-center py-3 text-lite">
                    © {new Date().getFullYear()} Copyright:
                    <Link to={{ pathname: "http://localhost:3000/" }}> CineHub</Link>
                </div>
            </footer>
        </>
    );
};
