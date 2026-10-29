import { useEffect, useState } from "react";
import {Col, Row} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getImageUrl } from "../../../helpers/utilities";
import { getRequest } from "../../../services/http.service";

export function Upcoming(){
    const [coming, setComing] = useState();

    useEffect(() => {
        getRequest('/comming-soon')
        .then((response) => {
            if(response.status == 200) {
                setComing(response.data)
            }
        })
        .catch((err) => {
            console.log("Error while getting the shows.")
        })
    }, [])
    return (<>
            {
            coming ? 
                <Row className="mt-5">
                    <Col sm={12} >
                        <h1 className="nowshowing-title">Coming Soon... </h1>
                        <hr />
                    </Col>
                    {
                        coming && coming.map((o,i) => (
                            <Col key={i} sm={12} md={4} className="movies">
                                <NavLink to={`/detail/`+o.id}>
                                    <div className="no_image">
                                        {
                                            o.image ? <img className="img img-fluid" src={getImageUrl(o.image)}/> : <>{ o.name }</>
                                        }
                                    </div>
                                </NavLink>
                            </Col>
                        ))
                    }
                </Row>
            : <></>
        }
  </>)
}