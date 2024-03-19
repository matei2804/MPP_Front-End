import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Domain/Home';
import MovieDetail from './Domain/MovieDetail';
import Add from './Domain/Add';
import Update from './Domain/Update';

function App() {
  
  
  return (  
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Add />} />
          <Route path="/update" element={<Update />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
    </Router>
  );
}

export default App
