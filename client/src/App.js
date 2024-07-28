import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import MainPage from './components/BookList';
import Profile from './components/Profile';
import BookList from './components/BookList';
import ReviewPage from './components/ReviewPage';

const App = () => {
  return (
    <>
      <Router>
        <div className='content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/booklist' element={<BookList />} />
            <Route path='/review' element={<ReviewPage />} />
          </Routes>
        </div>
      </Router>
    </>

  );
};

export default App;
