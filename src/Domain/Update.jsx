import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieData } from "./MovieData";
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap"

function Update(){

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [year_of_release, setYear] = useState("");
    const [trailer_link, setTrailer] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    let history = useNavigate();

    let index = MovieData
		.map(function (e) {
			return e.id;
		})
		.indexOf(id);
    
    const handleSubmit = (e) => {
		e.preventDefault();
		if (title == "" || genre == "" || year_of_release == "" || photo == "" || trailer_link == "")  {
			alert("invalid input");
			return;
		}

		let m = MovieData[index];

		m.title = title;
        m.genre = genre;
        m.photo = photo;
        m.year_of_release = year_of_release;
        m.trailer_link = trailer_link;
	
		history("/");
	};

    useEffect(() => {
       
        setTitle(localStorage.getItem("Title"));
        setGenre(localStorage.getItem("Genre"));
        setYear(localStorage.getItem("Year of realease"));
        setTrailer(localStorage.getItem("Trailer Link"));
        setPhoto(localStorage.getItem("Photo"));
        setId(localStorage.getItem("id"));
        
    }, []);
    
    

    return (
        <div>
             <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Control
                        type="text"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formGenre">
                    <Form.Control
                        type="text"
                        value={genre}
                        required
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formYearOfRelease">
                    <Form.Control
                        type="text"
                        value={year_of_release}
                        required
                        onChange={(e) => setYear(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formTrailerLink">
                    <Form.Control
                        type="text"
                        value={trailer_link}
                        required
                        onChange={(e) => setTrailer(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formPhoto">
                    <Form.Control
                        type="text"
                        value={photo}
                        required
                        onChange={(e) => setPhoto(e.target.value)}
                    />
                </Form.Group>

                <Button
					onClick={(e) => handleSubmit(e)}
					variant="primary"
					type="submit"
				>
					Update
				</Button>

            </Form>
        </div>
    )

}

export default Update;