import { useEffect, useState } from "react";
import { getRequest } from "../../../services/http.service";

import { Row, Col, Table } from "react-bootstrap";
import {toast} from "react-toastify";
import { getSeatName, getDateOnly } from "../../../helpers/utilities";

export function MyPayments(){
    let [tickets, setTickets] = useState([]);

    useEffect(() => {
        getRequest('/my-payments', true)
        .then((response) => {
            if(response.data.status) {
                setTickets(response.data.result);
            }
        })
        .catch((errors)=> {
            toast.error("Error while fetching your tickets.")
        })
    }, [])

    return (<>

        <Row>
            <Col sm={12}>
                <h2 className="text-center bordered-text">My Payment List</h2>
            </Col>

            <Col sm={12}>
                <Table className="table-bordered table-sm table-striped table-hover mt-3">

                    <thead className="table-dark">
                        <tr>
                            <th className="col text-white">S.N</th>
                            <th className="col text-white">Movie Name</th>
                            <th className="col text-white">OrderId</th>
                            <th className="col text-white">Date</th>
                            <th className="col text-white">Method</th>
                            <th className="col text-white">Payment Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets && tickets.map((o, i) => (
                                <tr key={i}>
                                    <td className="text-white">{i+1}</td>
                                    <td className="text-white">{o.movie_name}</td>
                                    <td className="text-white">{o.order_id}</td>
                                    <td className="text-white">{getDateOnly(o.payment_date)}</td>
                                    <td className="text-white">{o.paymentMethod == 'Khalti' ? "Online (Khalti)" : "COD"}</td>
                                    <td className="text-white">{o.total}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    </>);
}