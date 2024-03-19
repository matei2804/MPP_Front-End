import React, { useEffect, useState } from "react";
import { MovieData } from "./MovieData";
import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Home() {
    let history = useNavigate();
    const [movies, setMovies] = useState([]);

    function setID(id, title, genre, year_of_release, trailer_link, photo) {
        localStorage.setItem("id", id);
        localStorage.setItem("Title", title);
        localStorage.setItem("Genre", genre);
        localStorage.setItem("Year of release", year_of_release);
        localStorage.setItem("Trailer Link", trailer_link);
        localStorage.setItem("Photo", photo);
    }

    function deleted(id) {
        let index = movies.findIndex((e) => e.id === id);
        let newMovies = [...movies];
        newMovies.splice(index, 1);
        setMovies(newMovies);
        history("/");
    }

    useEffect(() => {
        setMovies([...MovieData]);
    }, []);

    const sortMovies = () => {
        const sorted = [...movies].sort((a, b) => a.year_of_release - b.year_of_release);
        setMovies(sorted);
    };

    return (
        <div>
            <h1>Movie List</h1>
            <br/><br/><br/>
            <div>
                <table className="left-aligned-table">
                    <tbody>
                        {movies.map((item) => (
                            <tr key={item.id}>
                                <td><Link to={`/movie/${item.id}`}>{item.title}</Link></td>
                                <td>
                                    <Link to={`/update`}>
                                        <Button onClick={() => setID(item.id, item.title, item.genre, item.year_of_release, item.trailer_link, item.photo)} variant="info">
                                            Update
                                        </Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button onClick={() => deleted(item.id)} variant="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br/>
            <Link to="/create">
                <button style={{ fontSize: '24px' }}>Create</button>
            </Link>
            <br/><br/>
            <Button onClick={sortMovies} variant="primary">
                Sort
            </Button>
        </div>
    );
}

export { Home };
