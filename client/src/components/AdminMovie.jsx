
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

export default function Order() {
    const [commingSoonList, setCommingSoonList] = useState([]);
    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        Axios.get('http://localhost:3001/api/comming-soon').then((response) => {
            setCommingSoonList(response.data);
        })

    }, []);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };




    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [trailer, setTrailer] = useState("");
    const [sendUpData, setSendUpData] = useState([]);
    const ref = useRef();

    const submit = (e) => {
        e.preventDefault();
        if (!name || !date || !selectedFile) {
            alert("Any field can't be blank");
        } else {
            const formData = new FormData();
            formData.append("myFile", selectedFile);
            formData.append("name", name);
            formData.append("date", date);
            formData.append("trailer", trailer);
            Axios.post('http://localhost:3001/api/up-comming', formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            setSendUpData([...sendUpData, { name: name, date: date }]);
            setName("");
            setDate("");
            ref.current.value = "";
            setTrailer("");
        }
    };
    return (
        <div className="mx-4 px-4 py-4 mt-2">
            <h1 className='text-center bg-info'>Comming Soon</h1>
            <div className="container-fluid my-3">
                <section >
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="row">
                                {
                                    commingSoonList.map((val) =>
                                        <div className="col-md-3 px-3 my-3" key={val.id}>
                                            <div className="card h-100">
                                                <div className="pt-3 pb-4 text-center h-100">
                                                    <div className="poster-frame-holder mb-2">
                                                        <span className="poster-frame-holder d-inline-block align-middle"></span>
                                                        <img className="img-fluid col-md-6 align-middle" src={"http://localhost:3001/file/comming-soon/"+val.img} alt={val.name} />
                                                    </div>
                                                    <div className="trailer-frame-holder">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </section>
                <hr />
                <div className="row p-4">
                    <div className="col-md-3"></div>
                    <div className="card col-md-6 p-5">
                        <div className="">
                            <form onSubmit={submit} method="POST" encType="multipart/form-data">
                                <div className="form-group">
                                    <label>Movie</label>
                                    <input type="text" name="moviename" className="form-control" placeholder="Movie" value={name} onChange={(e) => { setName(e.target.value); }} />
                                </div>
                                <div className="form-group">
                                    <label>Release Date</label>
                                    <input type="Date" name="release" className="form-control" placeholder="Release Date" value={date} onChange={(e) => { setDate(e.target.value); }} />
                                </div>
                                <div className="form-group">
                                    <label>Poster</label>
                                    <input type="file" name="img" className="form-control" placeholder="Add img" ref={ref} onChange={changeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Trailer</label>
                                    <input type="text" name="trailer" className="form-control" placeholder="iframe link only" value={trailer} onChange={(e) => { setTrailer(e.target.value); }} />
                                </div>
                                <button className="btn btn-primary btn-block">add</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}
