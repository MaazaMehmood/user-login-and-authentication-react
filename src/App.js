import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route path="/Signup" element={ <Signup/> } />
          <Route path="/Login" element={ <Login/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
