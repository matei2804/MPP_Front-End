import React from "react";
import { MovieData } from "./MovieData";
import MovieList from "./MovieList";
import './Home.css'
import { Link } from "react-router-dom";


function Home(){

    return (
        <div>
            <h1>Movie List </h1>
            <br/><br/><br/>
            <div>
                <table className="left-aligned-table">
                <tbody>
                    <MovieList movies={MovieData} />
                </tbody>
                </table>
            </div>
            <br/>
            <Link to="/create">
                <button style={{ fontSize: '24px' }}>Create</button>
            </Link>
        </div>
      );

}

export {Home};