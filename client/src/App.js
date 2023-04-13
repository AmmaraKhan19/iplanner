import React from "react"; // to use react
import './App.css'; // to use custom stylesheet
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; // to create routes
import Navbar from "./components/Navbar"; // to use navbar component
import { Home } from "./components/Home"; // to use home component
import { About } from "./components/About"; // to use about component
import NoteState from "./context/notes/NoteState"; // to enable notestate context for all routes
import Alert from "./components/Alert"; // use alert component to display alert messages
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
  <>
  {/* Calling notestate context first so that all the routers and their childrern can access it */}
    <NoteState>
      {/* Creating routers */}
      <Router>
        {/* enables for navbar to be showed/accessible on all routes */}
        <Navbar/>
        {/* display alert message*/}
        <Alert message="This is an alert message" />
        <div className="container">
          {/* Creating routes */}
            <Routes>
              {/* Route for home page */}
              <Route element={<Home />} exact path="/" />
              {/* Route for about page */}
              <Route element={<About />} exact path="/about" />
              {/* Route for login page */}
              <Route element={<Login />} exact path="/login" />
              {/* Route for signup page */}
              <Route element={<Signup />} exact path="/signup" />
            </Routes>
        </div>
      </Router>
    </NoteState>
  </>
  );
}

export default App;
