import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "axios";


export default function SingleOrder() {
    var { orderId } = useParams();
    const [orderList, setOrderList] = useState([]);//useState(movies[showId-1])
    useEffect(() => {
        Axios.get(`/orderId/${orderId}`).then((response) => {
            setOrderList(response.data)
        })
    });
    var grand = 0;
    return (
        <>
            <div>
                <div className="card mx-4 px-4 py-4 mt-4" >
                    <h1 className='text-center bg-info'>Order List</h1>
                    <table className="table table-striped mx-0 px-2 tabel-">
                        <thead>
                            <tr className='m-0 p-0'>
                                <th scope="col">S.N.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Order Date Time</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                orderList.map((val, i) => {
                                    grand = grand + (val.price * val.quantity);
                                    return (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{val.itemName}</td>
                                            <td>{val.quantity}</td>
                                            <td>{val.price * val.quantity}</td>
                                        </tr>
                                    );
                                })}
                            <tr className="bg-success text-light fw-bold">
                                <td colSpan={2}></td>
                                <td ><h5 className="text-white fw-bold">Grand Total</h5></td>
                                <td ><h5 className="text-white fw-bold">{grand}</h5></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );

}
