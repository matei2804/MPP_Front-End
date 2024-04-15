import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, updateMovie, fetchMovieList } from '../redux/movieSlicer';



function Update(){

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [yearOfRelease, setYear] = useState("");
    const [trailerLink, setTrailer] = useState("");
    const [photo, setPhoto] = useState("");
    const { movieId } = useParams(); 
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const { movie, isLoading, error } = useSelector(state => state.movieStore);

    useEffect(() => {
        dispatch(fetchMovieDetails(movieId));
    }, [dispatch, movieId]);


    useEffect(() => {
        if (movie) {
            setTitle(movie.title);
            setGenre(movie.genre);
            setYear(movie.yearOfRelease);
            setTrailer(movie.trailerLink);
            setPhoto(movie.photo);
        }
    }, [movie]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = {
            title,
            genre,
            yearOfRelease,
            trailerLink,
            photo,
        };
        
        dispatch(updateMovie({ movieId, updatedMovie }))
        .then(() => {
            dispatch(fetchMovieList());
        })
        .catch(error => {
            console.error("Failed to update the movie:", error);
        });
        navigate("/");
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
                        value={yearOfRelease}
                        required
                        onChange={(e) => setYear(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formTrailerLink">
                    <Form.Control
                        type="text"
                        value={trailerLink}
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