import React from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./Component/Home/Home"
import Project from './Component/Project/Project';
import Upload from './Component/Upload/Upload';
import Register from "./Component/Register/Register";
import Transcript from "./Component/Transcript/Transcript"
import Userauth from "./auth/UserAuth"
import { UserProvider } from './context/user';

function App() {
  

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/transcript" element={<Transcript />} />

        <Route path="/projects" element={
          <Userauth>
            <Project />
          </Userauth>
        } />
        <Route path="/upload" element={
          <Upload />
        } />
      </Routes>
    </Router>
  </UserProvider>
  )
}

export default App
