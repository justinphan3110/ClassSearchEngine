import React, { useState, Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './components/Search';
import Class from './components/Class';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';

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
      <Router >
        <div className="App Router" >
          <Switch>
          <Route key="home" path="/" exact strict component={Search}/>
          <Route  path="/search/:searchQuery" exact strict render={({match}) => (
            <Search key={"searchPage" + match.params.searchQuery} searchQuery={match.params.searchQuery}/>   
          )}/>
          <Route path="/class/:code" exact strict render={({match}) => (
            <Class code={match.params.code}/>   
          )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
