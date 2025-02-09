import './App.css';
import Home from './screens/Home';
import About from './screens/About'; // Example additional screen
import Login from './screens/Login';
import React from "react";
import Signup from './screens/Signup';




// Bootstrap imports
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Bootstrap JS


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}


export default App;
