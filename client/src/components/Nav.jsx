import React from "react";
// import "./styles.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import logo from "../../public/img/logo.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

// async function handleLogout() { }

var json = sessionStorage.getItem("token");
if (json) {
  var data = JSON.parse(json);
  if (data) {
    var name = data.name;
  }
}
export default function MyNav(props) {
  // const history = useHistory();
  const logout = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    // props.changePath("/login");
    // history.push("/login");
    window.location.href = "/";
    // changePath
  };
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="special-color-dark sticky-top">
      <Navbar.Brand to="/">
        <img src="/img/logo.png" alt={props.title} className="d-inline-block align-top img img-fluid" />
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {!props.setToken ? (
            <>
              <NavLink className="nav-item " to="/" exact activeClassName="active" >
                <span className="nav-link">Home</span>
              </NavLink>
              <NavLink className="nav-item" to="/now-showing">
                <span className="nav-link">Now showing</span>
              </NavLink>
              <NavLink className="nav-item" to="/coming-soon">
                <span className="nav-link">Coming Soon</span>
              </NavLink>
            </>
          ) : (
            !(props.setToken === "admin") ? (
              <>
                <NavLink className="nav-item " to="/dashboard" exact activeClassName="active" >
                  <span className="nav-link">Dashboard</span>
                <NavLink className="nav-item" to="/now-showing">
                  <span className="nav-link">Now showing</span>
                </NavLink>
                <NavLink className="nav-item" to="/coming-soon">
                  <span className="nav-link">Coming Soon</span>
                </NavLink>
                </NavLink>
                <NavLink className="nav-item" to="/book-movie">
                  <span className="nav-link">Book Movie</span>
                </NavLink>
                <NavLink className="nav-item" to="/order">
                  <span className="nav-link">Order</span>
                </NavLink>
                <NavLink className="nav-item" to="/my-order">
                  <span className="nav-link">My Order</span>
                </NavLink>
                
                
              </>
            ) : (
              <>
                <NavLink className="nav-item " to="/dashboard" exact activeClassName="active" >
                  <span className="nav-link">Dashboard</span>
                </NavLink>
                <NavLink className="nav-item" to="/food-request">
                  <span className="nav-link">Food Request</span>
                </NavLink>
                <NavLink className="nav-item" to="/movie-request">
                  <span className="nav-link">Movie Request</span>
                </NavLink>
                <NavLink className="nav-item" to="/movie">
                  <span className="nav-link">Movie</span>
                </NavLink>
                <NavLink className="nav-item" to="/users">
                  <span className="nav-link">Users</span>
                </NavLink>
              </>
            )
          )}
        </Nav>
        <Nav>
          {!props.setToken ? (
            <>
              <NavLink
                className="nav-item "
                to="/login"
                exact
                activeClassName="active"
              >
                <span className="nav-link">Login</span>
              </NavLink>
              <NavLink
                className="nav-item "
                to="/register"
                activeClassName="active"
              >
                <span className="nav-link">Register</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavDropdown
                align="end"
                title={name}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item className="nav-item" href="/about">
                  <span>About</span>
                </NavDropdown.Item>
                <NavDropdown.Item className="nav-item" href="/action">
                  <span>Action</span>
                </NavDropdown.Item>
                <NavDropdown.Item className="nav-item" href="/contact">
                  <span>Contact</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
