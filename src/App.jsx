import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieList from './Domain/MovieList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import here

const movies = [
  {
    id: 1,
    title: "Movie 1",
    genre: "Action",
    year_of_release: 2020,
    trailer_link: "https://www.example.com/trailer1",
    photo: "https://www.example.com/photo1.jpg"
  },
  {
    id: 2,
    title: "Movie 2",
    genre: "Comedy",
    year_of_release: 2019,
    trailer_link: "https://www.example.com/trailer2",
    photo: "https://www.example.com/photo2.jpg"
  },
];

function App() {
  
  return (
    <Router>
      <div>
        <h1>Welcome to My Movie App</h1>
        <Routes>
          <Route  path="/" element={<MovieList movies={movies} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App
