import React from "react";
import { Link } from 'react-router-dom';

const Movie = ({movie}) =>{

    const {id, title} = movie;

    return(
        <div>
            <h3>
            <Link to={`/movie/${id}`}>{title}</Link>
            </h3>
        </div>
    );

};

export {Movie}; 