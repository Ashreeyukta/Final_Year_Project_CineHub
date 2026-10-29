import { Container } from "react-bootstrap"
import {NowShowing} from "./now-showing.component"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export function CustomerDashboard() {
    return (<>
            <ToastContainer />
            
            <NowShowing />
        
    </>)
}