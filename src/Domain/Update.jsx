import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap"
import { useParams } from "react-router-dom";


function Update(){

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [year_of_release, setYear] = useState("");
    const [trailer_link, setTrailer] = useState("");
    const [photo, setPhoto] = useState("");
    const { movieId } = useParams(); 
    let navigate = useNavigate();

    useEffect(() => {
        
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/movie?id=${movieId}`);
                if (!response.ok) throw new Error('Failed to fetch movie details');
                const data = await response.json();
                setTitle(data.title);
                setGenre(data.genre);
                setYear(data.year_of_release);
                setTrailer(data.trailer_link);
                setPhoto(data.photo);
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to load movie details");
            }
        };
    
        fetchMovieDetails();
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMovie = {
            title,
            genre,
            year_of_release,
            trailer_link,
            photo,
        };

        try {
            const response = await fetch(`http://localhost:8080/movie/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            navigate("/");
        } catch (error) {
            console.error('Failed to update the movie:', error);
            alert("Failed to update the movie");
        }
    };
    

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