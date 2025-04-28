import React from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./Component/Home/Home"
import Project from './Component/Project/Project';
import Upload from './Component/Upload/Upload';
import Register from "./Component/Register/Register";
import Transcript from "./Component/Transcript/Transcript"

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/transcript" element={<Transcript />} />
        <Route path='/signup' element={<Register/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/upload' element={<Upload/>}/>
      </Routes>
    </Router>
  )
}

export default App
