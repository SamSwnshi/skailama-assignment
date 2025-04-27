import React from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./Component/Home/Home"
import Project from './Component/Project/Project';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/project' element={<Project/>}/>
      </Routes>
    </Router>
  )
}

export default App
