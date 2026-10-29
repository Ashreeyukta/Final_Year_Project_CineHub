import {getAdminToken, getToken, ucFirst, deleteToken, deleteAdminToken} from "../../../../helpers/utilities";

import "../../layout/layout.css"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Headers(props){
    let navigate = useNavigate();
    let [user, setUser] = useState();

    const logout = (ev) => {
        ev.preventDefault()
        deleteAdminToken();
        navigate('/admin/login');
    }

    useEffect(() => {
        let token = (props.isAdmin) ? getAdminToken() : getToken();
        if(!token){
            navigate('/admin/login')
        }
    }, [])

    useEffect(() => {
        let token = (props.isAdmin) ? getAdminToken() : getToken();
        setUser(token);
    }, [props])

    return (<>
        <header className="mb-auto">
            <div>
                <h3 className="float-md-start mb-0">
                    <img src="/img/logo.png" className="img img-fluid logo"></img>
                </h3>

                
                <nav className="nav nav-masthead justify-content-center p-3 float-md-end">
                    {
                        user  ? 
                                <>
                                    <Link className="nav-link sidemenu" to={user && user.token == 'admin' ? '/admin/dashboard' : '/dashboard' }>{ucFirst(user.token)}</Link>
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