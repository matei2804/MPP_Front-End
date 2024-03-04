import React from "react";
import { Movie, TitleOnlyMovie } from "./Movie";


const MovieList = ({movies}) =>{
    return (
        <div>
            <h1>Movie List</h1>
            {movies.map(movie => (
                <TitleOnlyMovie key = {movie.id} movie={movie}/>
            ))}
        </div>
    );
};

export default MovieList;