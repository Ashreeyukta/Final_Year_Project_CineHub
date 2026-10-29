import { NavLink } from "react-router-dom"
export function UserSidebar(){
    return (<>
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <NavLink className="nav-link" to={"/dashboard"}>
                        DASHBOARD
                    </NavLink>

                    <NavLink className="nav-link" to={"/my-tickets"}>                        
                        MY TICKETS
                    </NavLink>
                    <NavLink className="nav-link" to={"/my-orders"}>
                        ORDERS
                    </NavLink>      
                    <NavLink className="nav-link" to={"/my-payments"}>
                        PAYMENT
                    </NavLink>                  
                
                </div>
            </div>
        </nav>
    </>)
}