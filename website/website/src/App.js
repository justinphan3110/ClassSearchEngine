import React, { Component } from 'react';
import './App.css';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state ={
    class: [],
    newSearchModal: false,
    searchText: "n"
  }
  
  updateSearch(){
    axios.get('http://localhost:8080/search/classes/' + this.state.searchText).then((response) =>{
      this.setState({
        class: response.data
      })
    });
    this.toggleNewSearch()
  }

  toggleNewSearch(){
    this.setState({
      newSearchModal: ! this.state.newSearchModal
    });
  }
 
  render() {
    let cl = this.state.class.map((c) => {
      return (
        <tr>
          <td>{(c.subject.toUpperCase())}</td>
          <td>{c.id}</td>
          <td>{c.name}</td>
          <td>{c.description}</td>
          <td>Fall2019, Spring2020, Fall2018 </td>
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
              <th>NAME</th>
              <th>Description</th>
              <th>Class Info</th> 
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
