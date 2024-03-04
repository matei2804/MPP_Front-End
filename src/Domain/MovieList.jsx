import React from "react";
import Movie from "./Movie";

const MovieList = ({movies}) =>{
    return (
        <div>
            <h1>Movie List</h1>
            {movies.map(movie => (
                <Movie key = {movie.id}
                id={movie.id} 
                title={movie.title} 
                genre={movie.genre} 
                year_of_release={movie.year_of_release} 
                trailer_link={movie.trailer_link} 
                photo={movie.photo} 
                />

            ))}
        </div>
    );
};

export default MovieList;