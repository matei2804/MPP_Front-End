import React, { useEffect, useState } from "react";
import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import YearChart from "./YearChart";


function Home() {
    let history = useNavigate();
    const [movies, setMovies] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(5);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
        pageNumbers.push(i);
    }


    function setID(id, title, genre, year_of_release, trailer_link, photo) {
        localStorage.setItem("id", id);
        localStorage.setItem("Title", title);
        localStorage.setItem("Genre", genre);
        localStorage.setItem("Year of release", year_of_release);
        localStorage.setItem("Trailer Link", trailer_link);
        localStorage.setItem("Photo", photo);
    }

    function deleted(id) {
        fetch(`http://localhost:8080/movie/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            setMovies(movies.filter((movie) => movie.id !== id));
        })
        .catch(error => {
            console.error('Error deleting the movie:', error);
            alert("Failed to delete the movie");
        });
    }
    

    useEffect(() => {
        fetch('http://localhost:8080/movieList')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const sortMovies = () => {
        const sorted = [...movies].sort((a, b) => a.year_of_release - b.year_of_release);
        setMovies(sorted);

    };

    return (
        <div>
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                    <button onClick={() => paginate(number)} className='page-link'>
                        {number}
                    </button>
            </li>))}
            </ul>
            </nav>
            <h1>Movie List</h1>
            <br/><br/><br/>
            <div>
                <table className="left-aligned-table">
                    <tbody>
                        {currentMovies.map((item) => (
                            <tr key={item.id}>
                                <td><Link to={`/movie/${item.id}`}>{item.title}</Link></td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
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
            <br/><br/><br/>
            <div>
                <YearChart />
            </div>
        </div> 
    );
}

export { Home };
