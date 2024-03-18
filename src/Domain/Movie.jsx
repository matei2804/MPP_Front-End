import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'
import { MovieData } from "./MovieData";

const Movie = ({movie, handleDelete}) =>{

    const {id, title} = movie;

    let history = useNavigate();

    const onDelete = () =>
    {
        handleDelete(id);
        history('/');
    }

    return(
        <tr>
            <td>
            <Link to={`/movie/${id}`} target="_blank">{title}</Link>
            </td>
            <td>
                <Link to={`/update/${id}`}>
                <button onClick={() => alert(movie.id)}> Update </button>
                </Link>
                <button onClick={onDelete}> Delete </button>
            </td>
        </tr>
    );

};

export {Movie}; 