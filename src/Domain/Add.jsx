import React, { useState, useId } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieData } from "./MovieData";
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap"
import { fetchMovieList } from "../redux/movieSlicer";
import { useDispatch } from "react-redux";


function Add() {

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [year_of_release, setYear] = useState("");
    const [trailer_link, setTrailer] = useState("");
    const [photo, setPhoto] = useState("");
    const [userID, setUserID] = useState("");
 

    const dispatch = useDispatch();
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id_date = Date.now().toString();

        
        const movie = {
            id: id_date,
            title: title,
            genre: genre,
            yearOfRelease: year_of_release, 
            trailerLink: trailer_link,       
            photo: photo,
            userID: userID 
        };
        
        if (!title || !genre || !year_of_release || !trailer_link || !photo || !userID) {
            alert("INVALID INPUT!");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            setTitle("");
            setGenre("");
            setYear("");
            setTrailer("");
            setPhoto("");
            setUserID("");
            
            dispatch(fetchMovieList());

            history('/');
        } catch (error) {
            console.log(error);
            alert("Failed to add the movie");
        }
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

                <Form.Group className="mb-3" controlId="formUserID">
                    <Form.Control
                        type="text"
                        placeholder="Enter User ID"
                        required
                        onChange={(e) => setUserID(e.target.value)}
                    />
                </Form.Group>
                

                <Button
					onClick={(e) => handleSubmit(e)}
					variant="primary"
					type="submit"
				>
					Submit
				</Button>

            </Form>
        </div>
    )
}

export default Add;
