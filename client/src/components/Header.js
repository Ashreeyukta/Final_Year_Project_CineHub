import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">{props.title} here</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon">
                    {/* <img alt="logo" src="/img/logo.jpeg" /> */}
                </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <NavLink className="nav-item " to="/" exact activeClassName="active">
                        <span className="nav-link">Home <span className="sr-only">(current)</span></span>
                    </NavLink>
                    <NavLink className="nav-item" to="/now-showing">
                        <span className="nav-link">Now showing</span>
                    </NavLink>
                    <NavLink className="nav-item" to="/about">
                        <span className="nav-link">About</span>
                    </NavLink>
                    <NavLink className="nav-item disabled" to="/new">
                        <span className="nav-link">Disabled</span>
                    </NavLink>
                </ul>
                {props.searchBar ? (
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >
                            Search
                        </button>
                    </form>) : ("")
                }
            </div>
        </nav>
    );
}

Header.defaultProps = {
    title: "Title",
    // searchBar : true
};

Header.propTypes = {
    title: PropTypes.string,
    searchBar: PropTypes.bool.isRequired,
};
