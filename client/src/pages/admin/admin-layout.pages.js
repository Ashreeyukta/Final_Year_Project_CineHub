import "../layout.css";

import { Headers } from "../partials/header";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
    console.log("Admin layout");
    return (<>
        <div className="d-flex h-100 text-center text-white bd-red">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Headers></Headers>

                <main className="px-3 py-5">
                    <Outlet />
                </main>


            </div>

        </div>
    </>);
}