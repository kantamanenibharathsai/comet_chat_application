import React from 'react';
import './App.css';
import LandingPage from "./pages/LandingPage/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/register/Register';
import Login from './pages/login/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
