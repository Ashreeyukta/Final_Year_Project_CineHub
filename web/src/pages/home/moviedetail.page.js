import { useEffect, useState } from "react";
import { getRequest } from "../../services/http.service";
import { useParams, NavLink } from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import { compareDate } from "../../helpers/utilities";
export function MovieDetail(){
    let params = useParams();
    const [selectedMovie, setSelectedMovie] = useState([]);//useState(movies[showId-1])
    const [shows, setShows] = useState();
    useEffect(() => {
        let showId = params.id;
        getRequest(`/movie-detail/${showId}`).then((response) => {
            setSelectedMovie(response.data.movie)
            setShows(response.data.shows);
        })
    }, []);



    return (<>
            <div className="container">
                    
                    <div key={selectedMovie.id}>
                        <div className="row mt-5 py-5">
                            <iframe width="100%" height="700px" src={selectedMovie.trailer} title={selectedMovie.name} frameBorder="0" allowFullScreen></iframe>
                        </div>
                        <h1 className="current-movie">{selectedMovie.name}</h1>
                        <hr />
                        {
                            selectedMovie.description ? selectedMovie.description : ''
                        }
                        {
                            selectedMovie.status == 'showing' && shows ? <>
                                <hr />
                                <Row>
                                    <Col>
                                        <h4 className="text-white" style={{"textDecoration": "underline"}} >Show Time: </h4>
                                    </Col>
                                </Row>
                                {
                                    Object.keys(shows).map((date, i) => (
                                        
                                            compareDate(date) ? 
                                            <>
                                                <Row key={i} className="show_date">
                                                    <Col sm={12} >
                                                        <span style={{"textDecoration": "underline"}}>
                                                            {date}
                                                        </span>
                                                    </Col>
                                                    {
                                                        shows[date].length > 0 ? <>
                                                            {

                                                                shows[date].map((show_time, index) => (
                                                                    <>
                                                                        <Col sm={2} key={index} className="m-3">
                                                                            <NavLink className="btn btn-sm btn-success btn-book btn-rounded" to={`/book-ticket/`+show_time.movie_id+"/"+show_time.id}>
                                                                                {show_time.showingTime}
                                                                            </NavLink>
                                                                        </Col>
                                                                    </>
                                                                ))
                                                            }

                                                        </> : <></>
                                                    }
                                                </Row>
                                            </> 
                                            : <></>
                                        
                                    ))
                                }
                            </>
                            : ""
                        }
                    </div>
                
                    
            </div>
    </>)
}