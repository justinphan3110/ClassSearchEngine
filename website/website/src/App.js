import React, { useState, Component } from 'react';
import './App.css';
import {Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';
import MeetingMoreInfo from './components/MoreInfo';
import MoreDescription from './components/MoreDescription';
class App extends Component {
  state ={
    class: [],
    newSearchModal: false,
    searchText: "",
    collection: "classes",
    term: "classes",

  }
  
  updateSearch(){
    axios.get('http://localhost:8080/search/' + this.state.collection + '/' + this.state.searchText).then((response) =>{
      this.setState({
        class: response.data
      })
    });
    this.toggleNewSearch()
    console.log(this.state.term)
  }

  toggleNewSearch(){
    this.setState({
      newSearchModal: ! this.state.newSearchModal
    });
  }

  render() {
    let cl = this.state.class.map((c) => {
      // var colla pse = true; 
      // console.log(description)
      return (
        <tr key={(c.subject.toUpperCase()) + c.id}>
          <td>{(c.subject.toUpperCase())}</td>
          <td>{c.id}</td>
          <td>{c.title}</td>
          <MoreDescription description={c.description} code ={(c.subject.toUpperCase()) + c.id}/>
          <MeetingMoreInfo term={this.state.term} code={c.subject + c.id}/>
        </tr>
      )
    });

    return (
      <div className= "App container">
        <h1>Class Search</h1>
        <Button color="primary" onClick={this.toggleNewSearch.bind(this)}>Search</Button>
        <Modal isOpen={this.state.newSearchModal} toggle={this.toggleNewSearch.bind(this)}>
          <ModalHeader toggle={this.toggleNewSearch.bind(this)}>Search a Class You Want</ModalHeader>
          <ModalBody>
            <FormGroup>
               <Label for="search">Search</Label>
               <Input id="search" value ={this.state.searchText} onChange={(e) => {
                 this.setState({
                   searchText: e.target.value
                 });
              }}/>
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">Select</Label>
              <Input type="select" value={this.state.term} onChange = {(e) => {
                this.setState({
                  term: e.target.value
                })
              }}>
                  <option value ="classes">All Terms</option>
                  <option value ="fall2019">Fall 2019</option>
                  <option value ="spring2020">Spring 2020</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateSearch.bind(this)}>Search</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewSearch.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>   


        <Table>
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>ID</th>
              <th>TITLE</th>
              <th>Description</th> 
              <th>Meeting Info</th> 
            </tr>
          </thead>

          <tbody>
            {cl}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
