import { Outlet } from "react-router-dom";
import { Headers } from "../components/headers.component";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"

export function HomepageLayout(){
    return (<>

        <ToastContainer></ToastContainer>
        
        <Headers/>

        <Outlet />
    </>)
}