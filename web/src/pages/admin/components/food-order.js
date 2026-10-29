import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { getRequest } from "../../../services/http.service";
import {toast} from "react-toastify";
import { getSeatName, getDateOnly } from "../../../helpers/utilities";

export function FoodOrders(){
    let [tickets, setTickets] = useState([]);

    useEffect(() => {
        getRequest('/food-orders', true)
        .then((response) => {
            if(response.data.status) {
                setTickets(response.data.result);
            }
        })
        .catch((errors)=> {
            toast.error("Error while fetching your orders.")
        })
    }, [])

    return (<>

        <Row>
            <Col sm={12}>
                <h2 className="text-center bordered-text">Ordered food Lists</h2>
            </Col>

            <Col sm={12}>
                <Table className="table-bordered table-sm table-striped table-hover mt-3">

                    <thead className="table-dark">
                        <tr>
                            <th className="col text-white">S.N</th>
                            <th className="col text-white">Food Name</th>
                            <th className="col text-white">Seat No.</th>
                            <th className="col text-white">Order By</th>
                            <th className="col text-white">Date</th>
                            <th className="col text-white">Time</th>
                            <th className="col text-white">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets && tickets.map((o, i) => (
                                <tr key={i}>
                                    <td className="text-white">{i+1}</td>
                                    <td className="text-white">{o.food_name}</td>
                                    <td className="text-white">{getSeatName(o.seat)}</td>
                                    <td className="text-white">{o.name}</td>
                                    <td className="text-white">{getDateOnly(o.show_date)}</td>
                                    <td className="text-white">{o.show_time}</td>
                                    <td className="text-white">{o.payment_status ? "Paid(Esewa)" : "Cash On Delivery"}</td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    </>);
}