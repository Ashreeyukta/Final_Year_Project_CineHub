import {Container} from "react-bootstrap";
import { NowShowing } from "./components/now-showing.component";
import { Upcoming } from "./components/upcoming.component";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export function HomePage() {
    
    return (<>
        <ToastContainer />
        <Container className="py-5">
            <NowShowing></NowShowing>
            <Upcoming></Upcoming>
        </Container>
    </>)
}