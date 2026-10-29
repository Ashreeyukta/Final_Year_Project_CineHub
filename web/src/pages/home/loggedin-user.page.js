import { Headers } from "./components/headers.component";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "./layout/sidebar.layout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export function LoggedInUser() {
    let token = JSON.parse(localStorage.getItem("token"));

    return (<>

        <ToastContainer></ToastContainer>

        <Headers setToken={token} isAdmin={true}></Headers>

        <div className="clear" style={{ "height": "75px" }}></div>

        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <UserSidebar />
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                            <Outlet />
                    
                    </div>
                </main>
                
            </div>
        </div>
    </>)
}