import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
function App() {
  return (
  <>
    <Router>
      <Navbar/>
      <Routes>
          <Route element={<Home />} exact path="/" />
          <Route element={<About />} exact path="/about" />
        </Routes>
    </Router>
  </>
  );
}

export default App;
