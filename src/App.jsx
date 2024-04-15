import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Domain/Home';
import MovieDetail from './Domain/MovieDetail';
import Add from './Domain/Add';
import Update from './Domain/Update';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ConnectivityListener from './connectivityListener';


function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <ConnectivityListener />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Add />} />
            <Route path="/update/:movieId" element={<Update />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
          </Routes>
      </Router>
    </Provider> 
  );
}

export default App
