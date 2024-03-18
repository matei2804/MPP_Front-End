import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Domain/Home';
import MovieDetail from './Domain/MovieDetail';
import { MovieData } from './Domain/MovieData';
import Add from './Domain/Add';

function App() {
  
  return (  
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail movies={MovieData} />} />
          <Route path="/create" element={<Add />} /> 
        </Routes>
    </Router>
  );
}

export default App
