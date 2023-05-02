import React, {useState} from "react"; // to use react
import './App.css'; // to use custom stylesheet
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; // to create routes
import Navbar from "./components/Navbar"; // to use navbar component
import { Home } from "./components/Home"; // to use home component
import { About } from "./components/About"; // to use about component
import NoteState from "./context/notes/NoteState"; // to enable notestate context for all routes
import Alert from "./components/Alert"; // use alert component to display alert messages
import Login from "./components/Login"; // use login component to to go to login user
import Signup from "./components/Signup"; // use signup component to go to signup user

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
  <>
  {/* Calling notestate context first so that all the routers and their childrern can access it */}
    <NoteState>
      {/* Creating routers */}
      <Router>
        {/* enables for navbar to be showed/accessible on all routes */}
        <Navbar/>
        {/* display alert message*/}
        <Alert alert = {alert} />
        <div className="container">
          {/* Creating routes */}
            <Routes>
              {/* Route for home page */}
              <Route element={<Home showAlert = {showAlert}/>} exact path="/" />
              {/* Route for about page */}
              <Route element={<About />} exact path="/about" />
              {/* Route for login page */}
              <Route element={<Login showAlert = {showAlert} />} exact path="/login" />
              {/* Route for signup page */}
              <Route element={<Signup showAlert = {showAlert} />} exact path="/signup" />
            </Routes>
        </div>
      </Router>
    </NoteState>
  </>
  );
}

export default App;
