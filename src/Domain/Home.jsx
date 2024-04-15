import React, { useEffect, useState, useMemo } from "react";
import './Home.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import YearChart from "./YearChart";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList, deleteMovie } from "../redux/movieSlicer";

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc');

    const dispatch = useDispatch();
    const { data: movies, isLoading, error } = useSelector(state => state.movieStore);

    useEffect(() => {
        if (!movies) {
            dispatch(fetchMovieList());
        }
    }, [dispatch, movies]);

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedAndPagedMovies = useMemo(() => {
        if (!movies) return [];
        const sortedMovies = [...movies].sort((a, b) => sortOrder === 'asc' ? a.yearOfRelease - b.yearOfRelease : b.yearOfRelease - a.yearOfRelease );
        return sortedMovies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage);
    }, [movies, sortOrder, currentPage, moviesPerPage]);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil((movies?.length || 0) / moviesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleDelete = (id) => {
        dispatch(deleteMovie(id));
    };

    return (
        <div>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <button onClick={() => setCurrentPage(number)} className='page-link'>
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <h1>Movie List</h1>
            <div>
                <table className="left-aligned-table">
                    <tbody>
                        {sortedAndPagedMovies.map((movie) => (
                            <tr key={movie.id}>
                                <td><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                                <td>
                                    <Link to={`/update/${movie.id}`}>
                                        <Button variant="info">Update</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(movie.id)} variant="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/create">
                <button style={{ fontSize: '24px' }}>Create</button>
            </Link>
            <Button onClick={toggleSortOrder} variant="primary">Sort</Button>
            <YearChart />
        </div> 
    );
}

export { Home };
