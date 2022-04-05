import React, { Component } from 'react';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/home"
import Education from "./pages/education"
import Fiction from "./pages/fiction"

class App extends Component {
  render (){
    return(
      <div className="App">
        <Router>                 
          <Route exact path="/" component={Home} />
          <Route path="/education" component={Education} />
          <Route path="/fiction" component={Fiction} />
        </Router>
      </div>
    )
  }
}

export default App;
