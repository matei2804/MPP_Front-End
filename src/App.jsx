import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from './Domain/Home';
import MovieDetail from './Domain/MovieModel/MovieDetail';
import AddMovie from './Domain/MovieModel/AddMovie';
import UpdateMovie from './Domain/MovieModel/UpdateMovie';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ConnectivityListener from './connectivityListener';
import webSocketService from './webSocketService';
import UserPage from './Domain/UserModel/UserPage';
import AddUser from './Domain/UserModel/AddUser';
import UpdateUser from './Domain/UserModel/UpdateUser';
import Login from './login/login';



function App() {
  
  // useEffect(() => {
  //   webSocketService.connect();

  //   return () => {
  //     webSocketService.disconnect();
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        {/* <ConnectivityListener /> */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/create" element={<AddMovie />} />
            <Route path="/update/:movieId" element={<UpdateMovie />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/updateUser/:userId" element={<UpdateUser />} />
          </Routes>
      </Router>
    </Provider> 
  );
}

export default App
