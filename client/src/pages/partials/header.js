import { ucFirst } from "../../helpers/utilitis";
import "../layout.css"
import { Link, NavLink, useNavigate } from "react-router-dom";

export function Headers(props){
    let navigate = useNavigate();

    const logout = (ev) => {
        ev.preventDefault();
        sessionStorage.removeItem('token');
        navigate('/login');
        //history.push("/admin/login")
    }

    return (<>
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">
                    <img src="/img/logo.png" className="img img-fluid logo"></img>
                </h3>

                
                <nav className="nav nav-masthead justify-content-center p-3 float-md-end">
                    {
                        props.setToken ? 
                                <>
                                    <Link className="nav-link sidemenu" to={props.setToken && props.setToken == 'admin' ? '/admin/dashboard' : '/dashboard' }>{ucFirst(props.setToken)}</Link>
                                    <a onClick={logout} className="nav-link sidemenu sidemenu-red">Logout</a>
                                </> : <>
                                    <Link className="nav-link sidemenu" to="/login">Login</Link>
                                    <Link className="nav-link sidemenu sidemenu-red" to="/register">Sign Up</Link>
                                </>
                    }
                    
                </nav>

                <nav className="nav nav-masthead justify-content-center text-underline float-md-center">

                    <NavLink to="/" className="nav-link nav-text">Home</NavLink>
                    <NavLink to="/now-showing" className="nav-link nav-text">Now <span className="sidemenu-red">Showing</span></NavLink>
                    <NavLink to="/coming-soon" className="nav-link nav-text">Coming <span className="sidemenu-red">Soon</span></NavLink>
                </nav>
            </div>
        </header>
    </>)
}