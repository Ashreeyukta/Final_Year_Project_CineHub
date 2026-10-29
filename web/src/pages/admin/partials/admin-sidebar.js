import { NavLink } from "react-router-dom";

export function AdminSidebar() {
    return (<>
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <NavLink className="nav-link" to={"/admin"}>
                        DASHBOARD
                    </NavLink>

                    <NavLink className="nav-link" to={"/admin/food-request"}>                        
                        FOOD REQUEST
                    </NavLink>

                    <NavLink className="nav-link" to={"/admin/movie-request"}>                        
                        MOVIE REQUEST
                    </NavLink>   
                    <NavLink className="nav-link" to={"/admin/users"}>
                        USERS
                    </NavLink>                  
                
                </div>
            </div>
        </nav>
    </>)
}