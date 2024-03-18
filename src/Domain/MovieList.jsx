import React, {useState} from "react";
import { Movie } from "./Movie";
import { MovieData } from "./MovieData";


const MovieList = () =>{

    const [movies, setMovies] = useState(MovieData);

    const handleDelete = (id) => {
        setMovies(movies.filter(movie => movie.id !== id));
    };

    return (
        <tbody>
            {movies.map(movie => (
                <Movie key = {movie.id} movie={movie} handleDelete={handleDelete}/>
            ))}
        </tbody>
    );
};

export default MovieList;