import React, { useState, useId } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieData } from "./MovieData";
import { useNavigate } from "react-router-dom";
import {Form} from "react-bootstrap"


function Add({onAddMovie}) {

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year_of_release, setYear] = useState('');
    const [trailer_link, setTrailer] = useState('');
    const [photo, setPhoto] = useState('');

    const uniqueId = useId();   

    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let t = title;
        let g = genre;
        let year = year_of_release;
        let trailer = trailer_link;
        let p = photo;

        MovieData.push({ id: uniqueId, title: t, genre: g, year_of_release: year, trailer_link: trailer, photo: p });
        history('/');
    }

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Control
                        type="text"
                        placeholder="Enter Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formGenre">
                    <Form.Control
                        type="text"
                        placeholder="Enter Genre"
                        required
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formYearOfRelease">
                    <Form.Control
                        type="text"
                        placeholder="Enter Year of Release"
                        required
                        onChange={(e) => setYear(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formTrailerLink">
                    <Form.Control
                        type="text"
                        placeholder="Enter Trailer Link"
                        required
                        onChange={(e) => setTrailer(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formPhoto">
                    <Form.Control
                        type="text"
                        placeholder="Enter Photo URL"
                        required
                        onChange={(e) => setPhoto(e.target.value)}
                    />
                </Form.Group>

                <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </Form>
        </div>
    )
}

export default Add;
