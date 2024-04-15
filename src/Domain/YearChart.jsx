import React, { useEffect, useState } from "react";
import './Home.css';
import {Chart as ChartJS } from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList, deleteMovie } from "../redux/movieSlicer";

const YearChart = () => {

    const dispatch = useDispatch();
    const { data: movies, isLoading, error } = useSelector(state => state.movieStore);

    useEffect(() => {
        if (!movies) {
            dispatch(fetchMovieList());
        }
    }, [dispatch, movies]);

    const movieTitles = movies ? movies.map(movie => movie.title) : [];
    const movieYears = movies ? movies.map(movie => movie.yearOfRelease) : [];


    const data = {
        labels: movieTitles,
        datasets: [
            {
                    label: "Year",
                    data: movieYears,
                    backgroundColor: 'green'
            }
        ]
    };

    const options = {
        scales: {
            y: {
                min: 1850,
                max: 2024
            }
        }
    };
    
    return (
        <div>
            <h2>Chart based on the release year of each movie</h2>
            <br></br><br></br>
            <Bar data={data} options={options} />
        </div>
    );
}

export default YearChart;
