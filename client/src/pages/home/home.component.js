import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import image from "../../img/spider-man-no-way-home-imax-poster.png";


export function NowShowing() {

    
    
    return (<>
        <Container>
            <Row className="mt-5">
                <Col sm={12} md={6} lg={4} className="mt-3">
                    <Card className="bg-dark text-white">

                        <NavLink to="/">
                            <Card.Img src={image} alt="Card image" />
                        </NavLink>
                    </Card>

                </Col>
                <Col sm={12} md={6} lg={4} className="mt-3">
                    <Card className="bg-dark text-white">

                        <NavLink to="/">
                            <Card.Img src={image} alt="Card image" />
                        </NavLink>
                    </Card>

                </Col>
                <Col sm={12} md={6} lg={4} className="mt-3">
                    <Card className="bg-dark text-white">

                        <NavLink to="/">
                            <Card.Img src={image} alt="Card image" />
                        </NavLink>
                    </Card>

                </Col>
                <Col sm={12} md={6} lg={4} className="mt-3">
                    <Card className="bg-dark text-white">

                        <NavLink to="/">
                            <Card.Img src={image} alt="Card image" />
                        </NavLink>
                    </Card>

                </Col>
            </Row>
        </Container>
    </>)
}