import React, {Component } from 'react';
import {Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';
import MeetingMoreInfo from './MeetingMoreInfo';
import MoreDescription from './MoreDescription';


class Search extends Component {

  //constructor
  constructor (props){
    super(props);
    const {searchQuery} = this.props;
    this.state ={
      class: [],
      newSearchModal: false,
      searchQuery,
      collection: "classes",
      term: "fall2019",

      hosting: "172.20.84.245"
    }
   
  }
  
  updateSearch(){
    axios.get('http://' + this.state.hosting + ':8080/search/' + this.state.collection + '/' + this.state.searchQuery).then((response) =>{
      this.setState({
        class: response.data
      })
    });
    this.toggleNewSearch()
    // console.log(this.state.term)
  }

  toggleNewSearch(){
    this.setState({
      newSearchModal: ! this.state.newSearchModal
    });
  }

  componentDidMount(){
    if(this.state.searchQuery !== undefined){
      console.log("searching: " + this.state.searchQuery);
      this.updateSearch()
      this.toggleNewSearch()
    }

  }

  render() {
    let cl = this.state.class.map((c) => {
      // var colla pse = true; 
      // console.log(description)
      return (
        <tr key={(c.subject.toUpperCase()) + c.id}>
          <td>{(c.subject.toUpperCase())}</td>
          <td>{c.id}</td>
          <td>{c.title}   </td>
          <MoreDescription description={c.description} code ={(c.subject.toUpperCase()) + c.id}/>
          <MeetingMoreInfo term={this.state.term} code={c.subject + c.id}/>    
        </tr>
      )
    });

    return (
      <div className= "Search">
        <h1>Class Search</h1>
        <Button color="primary" onClick={this.toggleNewSearch.bind(this)}>Search</Button>
        <Modal isOpen={this.state.newSearchModal} toggle={this.toggleNewSearch.bind(this)}>
          <ModalHeader toggle={this.toggleNewSearch.bind(this)}>Search a Class You Want</ModalHeader>
          <ModalBody>
            <FormGroup>
               <Label for="search">Search</Label>
               <Input id="search" value ={this.state.searchQuery} onChange={(e) => {
                 this.setState({
                   searchQuery: e.target.value
                 });
              }}/>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateSearch.bind(this)}>Search</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewSearch.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>   


        <Table hover>
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>ID</th>
              <th>TITLE</th>
              <th>Description</th> 
              <th>
                <FormGroup>
                  <Input type="select" value={this.state.term} onChange = {(e) => {
                    this.setState({
                      term: e.target.value
                     })
                    }}>
                  <option value ="fall2019">Fall 2019</option>
                  <option value ="spring2020">Spring 2020</option>
              </Input>
            </FormGroup>
            </th>
            {/* <th></th>  */}
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

export default Search;
