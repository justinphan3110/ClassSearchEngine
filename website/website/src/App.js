import React, { useState, Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './components/Search';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends Component {
  state ={
    class: [],
    newSearchModal: false,
    searchText: "",
    collection: "classes",
    term: "fall2019",

  }
  

  render() {
    return(
      <Router>
        <div className="App Router">
          <Route path="/" exact strict render={
            () => {
              return (<Search/>)
            }
          }/>

          <Route path="/class" exact strict render={
            () => {
              return (<div>Hello</div>)
            }
          }/>
        </div>
      </Router>
    );
  }
}

export default App;
