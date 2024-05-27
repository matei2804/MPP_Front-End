import React, { useEffect, useState, useMemo } from "react";
import './Home.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import YearChart from '../Domain/MovieModel/YearChart'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList, deleteMovie } from "../redux/movieSlicer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc');
    const [username, setUsername] = useState('-');
    const [roles, setRoles] = useState([]);
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const { data: movies, isLoading, error } = useSelector(state => state.movieStore);

    useEffect(() => {
        dispatch(fetchMovieList());
        
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.name);
                setRoles(decoded.roles ? decoded.roles.split(' ') : []);

            } catch (error) {
                console.error("Failed to decode the token:", error);
            }
        }

    }, [dispatch]);

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

    const handleSignOut = () => {
        localStorage.removeItem('jwtToken');  
        navigate('/');
    };

    const hasRole = (role) => {
        return roles.includes(role);
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
            <div className="login-buttons">
                <Link to="/">
                        <button className="" style={{ fontSize: '24px' }}>Login page</button>
                </Link>
                <Button className="" onClick={handleSignOut} variant="primary">Sign out</Button>
            </div>
            <h1>Movie List</h1><br></br>
            <p><b>Welcome, {username}!</b></p> 
            <div>
                <table className="left-aligned-table">
                    <tbody>
                        {sortedAndPagedMovies.map((movie) => (
                            <tr key={movie.id}>
                                <td><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                                {hasRole('ROLE_MANAGER') || hasRole('ROLE_ADMIN') ? (
                                    <td>
                                        <Link to={`/update/${movie.id}`}>
                                            <Button variant="info">Update</Button>
                                        </Link>
                                    </td>
                                ) : null}
                                {hasRole('ROLE_MANAGER') || hasRole('ROLE_ADMIN') ? (
                                    <td>
                                        <Button onClick={() => handleDelete(movie.id)} variant="danger">
                                            Delete
                                        </Button>
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="home-buttons">
                {hasRole('ROLE_MANAGER') || hasRole('ROLE_ADMIN') ? (
                    <Link to="/create">
                        <button className="home-page-button" style={{ fontSize: '24px' }}>Create</button>
                    </Link>
                ) : null}
                <Button className="home-page-button" onClick={toggleSortOrder} variant="primary">Sort</Button>
                <Link to="/userPage">
                    <button className="home-page-button" style={{ fontSize: '24px' }}>User page</button>
                </Link>
            </div>
            <YearChart />
        </div> 
    );
}

export { Home };
