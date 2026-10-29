
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Order() {
    const [foodList, setFoodList] = useState([]);
    const [itemAmt, setItemAmt] = useState("");

    useEffect(() => {
        Axios.get('http://localhost:3001/api/food').then((response) => {
            setFoodList(response.data);
        })

    }, []);
    const doAddItems = (id, name) => {
        console.log(id + "-" + itemAmt);
        if (!itemAmt || itemAmt < 1) {
            alert("enter vaild Qty for " + name);
        } else {
            var json = sessionStorage.getItem("token");
            if (json) {
                var data = JSON.parse(json);
                if (data) {
                    var userId = data.id;
                }
            }
            Axios.post("http://localhost:3001/api/orderfood", {
                id: id,
                itemAmt: itemAmt,
                userId: userId,
            });
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = ""),
            );
        }
    };
    return (
        <div className="mx-4 px-4 py-4 mt-2">
            <h1 className='text-center bg-info'>Food List</h1>
            <div className="card mx-4 px-4 py-4 mt-4 d-none" >
                <table className="table table-striped mx-0 px-2 tabel-">
                    <thead>
                        <tr className='m-0 p-0'>
                            <th scope="col">Food Item</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty.</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodList.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.itemName}</td>
                                    <td>{val.price}</td>
                                    <td>
                                        <input type="number" name={"itemAmt" + val.id} id={"itemAmt" + val.id} required onChange={(e) => { setItemAmt(e.target.value); }} />
                                    </td>
                                    <td>
                                        {/* <div className="btn btn-primary btn-round " onClick={doAddItems.bind(val.id)}></div> */}
                                        <button onClick={() => { doAddItems(val.id, val.itemName) }} >Add</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <>
                <div className="container-fluid my-3">
                    <section >
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <div className="row">
                                    {foodList.map((val) =>
                                        <div className="col-md-3 px-3 my-3 d-inline-block mb-4" key={val.id} title={val.name}>
                                            <div className="card h-100">
                                                <div className="pt-3 pb-4 text-center h-100">
                                                    <div className="poster-frame-holder mb-2">
                                                        <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                        <img className="img-fluid col-md-6 align-middle" src={"../img/" + val.itemName + ".jpg"} alt={val.itemName} />

                                                    </div>
                                                    <div className="trailer-frame-holder">
                                                        <h5 className="text-center"> {val.itemName+" (RS. "+val.price+") "}</h5>
                                                    </div>
                                                </div>
                                                <div className=" text-center px-3 mx-2">
                                                    <div className="row">
                                                        <input className="d-block" type="number" name={"itemAmt" + val.id} id={"itemAmt" + val.id} required onChange={(e) => { setItemAmt(e.target.value); }} />
                                                        <button className=" btn btn-success mx-0" onClick={() => { doAddItems(val.id, val.itemName) }} >Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </section>
                </div>
            </>
        </div>
    )
}
