import React, { useEffect, useState } from "react";
import { MovieData } from "./MovieData";
import './Home.css';
import {Chart as ChartJS } from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";

const YearChart = () => {

    const movieTitles = MovieData.map(movie => movie.title);
    const movieYears = MovieData.map(movie => movie.year_of_release);

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
                min: 1900,
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
