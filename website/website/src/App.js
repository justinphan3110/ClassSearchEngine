import React, { Component } from 'react';
import './App.css';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state ={
    class: [],
    newSearchModal: false,
    searchText: "",
    term: "classes"
  }
  
  updateSearch(){
    axios.get('http://localhost:8080/search/' + this.state.term + '/' + this.state.searchText).then((response) =>{
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
      return (
        <tr>
          <td>{(c.subject.toUpperCase())}</td>
          <td>{c.id}</td>
          <td>{c.title}</td>
          <td>{c.description}</td>
          <td></td>
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
                <Label for="departureTime">Term</Label>
                <Input type="select"value={this.state.term} onChange = {(e) => {
                  let {term} = this.state;
                  term = e.target.value;
                  this.setState({term});
                }}>
                    <option value="classes">Default</option>
                    <option value="fall2019">Fall 2019</option>
                    <option vaue="spring2020">Spring 2020</option>
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
