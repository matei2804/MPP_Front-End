import React from "react";
import { Movie } from "./Movie";


const MovieList = ({movies}) =>{
    return (
        <div>
            <h1>Movie List</h1>
            {movies.map(movie => (
                <Movie key = {movie.id} movie={movie}/>
            ))}
        </div>
    );
};

export default MovieList;