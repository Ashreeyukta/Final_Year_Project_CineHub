import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "./layout.css";
import "../../../assets/admin/css/styles.css";
import { Headers } from "../partials/headers/Adminheaders.component";
import { AdminSidebar } from "../partials/admin-sidebar";

export function AdminLayout() {
    let token = JSON.parse(localStorage.getItem("admin_token"));

    return (<>


        <Headers setToken={token} isAdmin={true}></Headers>

        <div className="clear" style={{ "height": "75px" }}></div>

        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <AdminSidebar />
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <div className="mb-4">
                            <Outlet />
                        </div>
                    </div>
                </main>
                
            </div>
        </div>
    </>)
}