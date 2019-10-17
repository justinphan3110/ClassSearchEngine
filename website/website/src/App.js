import React, { useState, Component } from 'react';
import './App.css';
import { Collapse,Card,CardBody, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state ={
    class: [],
    newSearchModal: false,
    moreInfoModal: false,
    searchText: "",
    term: "classes",
    collapse : true
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

  // toggleMoreInfo(c){
  //   this.setState({
  //     moreInfoModal: ! this.state.moreInfoModal
  //   });

  //   console.log(c.title);
  // }
  toggleMoreInfo(){
    this.setState({
      collapse : ! this.state.collapse
    });
    // console.log(collapse);
  };

  render() {
    let cl = this.state.class.map((c) => {
      // var collapse = true; 

      return (
        <tr>
          <td>{(c.subject.toUpperCase())}</td>
          <td>{c.id}</td>
          <td>{c.title}</td>
          <td>{c.description}</td>
          <td>
           <Button color="info" size="sm" onClick={this.toggleMoreInfo.bind(this)}>More Info</Button>
           <Collapse isOpen={this.state.collapse}>
            <Card>
            <CardBody>
              nooo
            </CardBody>
            </Card>
          </Collapse>
         </td>
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
              <th>TITLE</th>
              <th>Description</th> 
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
