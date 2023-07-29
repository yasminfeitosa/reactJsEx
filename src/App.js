import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DetailsPage from "./pages/DetailsPage";
import EditPage from "./pages/EditPage";
import './App.css';
import AddPage from "./pages/AddPage";

class App extends Component {
  state = {
    data: null
  };

  render() {
    return (
        <div className="App">
          <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/edit/:id" element={<EditPage />} />
                <Route path="/details/:id" element={<DetailsPage />} />
            </Routes>
          </Router>
          <p className="App-intro">{this.state.data}</p>
        </div>
    );
  }
}

export default App;