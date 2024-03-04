import React from "react";
import { Link } from 'react-router-dom';

const Movie = ({id, title, genre, year_of_release, trailer_link, photo}) =>{

    return(
        <div>
            <h3>{title}</h3>
            <img src={photo} alt={title} />
            <p>Genre: {genre}</p>
            <p>Year of release: {year_of_release}</p>
            <video src={trailer_link} controls/>
        </div>
    );

};

export default Movie;
