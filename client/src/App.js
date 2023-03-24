import React from "react"; // to use react
import './App.css'; // to use custom stylesheet
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; // to create routes
import Navbar from "./components/Navbar"; // to use navbar component
import { Home } from "./components/Home"; // to use home component
import { About } from "./components/About"; // to use about component
import NoteState from "./context/notes/NoteState"; // to enable notestate context for all routes

function App() {
  return (
  <>
  {/* Calling notestate context first so that all the routers and their childrern can access it */}
    <NoteState>
      {/* Creating routers */}
      <Router>
        {/* enables for navbar to be showed/accessible on all routes */}
        <Navbar/>
        <div className="container">
          {/* Creating routes */}
            <Routes>
              {/* Route for home page */}
              <Route element={<Home />} exact path="/" />
              {/* Route for about page */}
              <Route element={<About />} exact path="/about" />
            </Routes>
        </div>
      </Router>
    </NoteState>
  </>
  );
}

export default App;
