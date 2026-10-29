import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadSingleFile } from "../../../services/http.service";

export function AdminMovieAdd() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [trailer, setTrailer] = useState();
    const [status, setStatus] =  useState("upcoming");
    const [movie, setMovie] = useState();
    const [description, setDescription] = useState();

    let navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        if (!name || !date || !trailer) {
            alert("Any field can't be blank");
        } else {
            uploadSingleFile('post',`add-new-movie`,  {
                name: name, date: date, trailer: trailer, description: description, status: status
            }, movie).then((res) => {
                // console.log(res);
                if (!res.result) {
                    alert("fail");
                } else {
                    alert("success");
                }
                navigate(-1);
                // history.goBack()
            }
            ).catch((err) => {
                console.log("Err: ", err)
                alert("Failure");
            })
        }
    };

    const handleFile = (e) => {
        let {files} = e.target;
        // console.log(files[0]);
        setMovie(files[0]);
    }
    return (
        <>
            <div className="mx-md-4 px-md-4 py-md-4 mt-1 mt-md-2">
                <h1 className='text-center title-red'>Add Movie</h1>
                <div className="container-fluid my-md-3 ">
                    <div className="row p-md-4">
                        <div className="offset-md-1 col-md-10 p-5">
                            <div className="">
                                <form onSubmit={submit} method="POST">
                                    <div className="row mb-3 form-group">
                                        <label>Movie</label>
                                        <input type="text" autoComplete='off' name="moviename" className="form-control" placeholder="Movie" onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                    <div className="row mb-3 form-group">
                                        <label>Showing Status </label>
                                        <select name="status" onChange={(e) => {setStatus(e.target.value)}} className="form-control">
                                            <option value="">--Select Any One--</option>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="showing">Is Showing</option>
                                        </select>
                                    </div>
                                    <div className="row mb-3 form-group">
                                        <label>Release Date</label>
                                        <input type="Date" name="release" className="form-control" placeholder="Release Date" onChange={(e) => { setDate(e.target.value); }} />
                                    </div>
                                    <div className="row mb-3 form-group">
                                        <label>Trailer</label>
                                        <input type="text" autoComplete='off' name="trailer" className="form-control" placeholder="iFrame Link only" onChange={(e) => { setTrailer(e.target.value); }} />
                                    </div>


                                    <div className="row mb-3 form-group">
                                        <label>Poster</label>
                                        <input type="file" name="movie" accept="image/*" onChange={handleFile}/>
                                    </div>

                                    
                                    <div className="row mb-3 form-group">
                                        <label>Description</label>
                                        <textarea autoComplete='off' name="description" className="form-control" placeholder="Description" onChange={(e) => { setDescription(e.target.value); }} />
                                    </div>
                                    <button className="btn btn-success btn-block">Add Movie</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </>
    );
}