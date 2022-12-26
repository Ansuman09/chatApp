// import h+ from "./pages/Toptens";
import Button from 'react-bootstrap';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import PostPage from './pages/Post';
import './cssfiles/style.css'
import NewPost from './pages/NewPost';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utls/PrivateRoute';
import { useState,useEffect } from 'react';
import {AuthContext} from './context/AuthContext';
import userEvent from '@testing-library/user-event';
import jwtDecode from 'jwt-decode';
import UserPage from './pages/UserPage';

function App() {
  const [handler,setHandler]=useState(localStorage.getItem('authTokens')? jwtDecode(localStorage.getItem('authTokens')):null)

  return(
    <BrowserRouter>
    <AuthContext.Provider value={{handler,setHandler}}>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/post/:id' element={<PostPage/>}/>
      <Route path='/newpost/:id' element={<NewPost/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/private' element={<PrivateRoute/>}/>
      <Route path='/user/:id' element={<UserPage/>}/>
      </Routes>
    </AuthContext.Provider>
    </BrowserRouter>
  )
}


export default App;
