import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Pages/Home/Home';
import Play from './Pages/Play/Play';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/play" element={<Play />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
