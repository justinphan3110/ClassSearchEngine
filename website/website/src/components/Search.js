import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';
import {Event} from "./Tracking";
import MeetingMoreInfo from './MeetingMoreInfo';
import MoreDescription from './MoreDescription';
import { Redirect, withRouter } from 'react-router-dom';
import HelpDesk from './HelpImproveSearch';



class Search extends Component {

  //constructor
  constructor(props) {
    super(props);
    const { searchQuery } = this.props;
    this.state = {
      class: [],
      newSearchModal: false,
      searchQuery,
      collection: "classes",
      term: "default",

      routeToSearch: false,

      // hosting: 'localhost'
      hosting: '34.69.198.55'
    }

    console.log("searchQuery in constructor: " + this.state.searchQuery);

  }

  updateSearch() {
    axios.get('http://' + this.state.hosting + ':8080/search/'
      + this.state.collection + '/'
      + this.state.searchQuery).then((response) => {
        this.setState({
          class: response.data
        })
      });
    this.toggleNewSearch()
    console.log(this.state.defaultTerm)
  }


  routeToSearchPage() {
    this.setState({
      routeToSearch: !this.state.routeToSearch
    });
  }

  toggleNewSearch() {
    Event("SEARCH", "searching " + this.state.searchQuery , "SEARCH_PAGE");
    this.setState({
      newSearchModal: !this.state.newSearchModal
    });
  }

  componentDidMount() {
    console.log(this.state.searchQuery)
    if (this.state.searchQuery !== undefined) {
      console.log("searching: " + this.state.searchQuery);
      axios.get('http://' + this.state.hosting + ':8080/search/'
        + this.state.collection + '/'
        + this.state.searchQuery).then((response) => {
          this.setState({
            class: response.data
          })
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.term !== prevProps.term) {
        this.setState({
            term: this.props.term
        });
    }
}

  

  render() {
    let cl = this.state.class.map((c) => {
      // var colla pse = true; 
      // console.log(description)
      if (c.semester.includes(this.state.term) || this.state.term === 'default'){
        return (
          <tr key={(c.subject.toUpperCase()) + c.id}>
            <td>{(c.subject.toUpperCase())}</td>
            <td>{c.id}</td>
            <td>{c.title}   </td>
            <MoreDescription description={c.description} code={(c.subject.toUpperCase()) + c.id} />
            <MeetingMoreInfo term={this.state.term} code={c.subject + c.id} />
          </tr>
        )
        }
    });

    if (this.state.routeToSearch === true) {
      return <Redirect push to={'/search/' + this.state.searchQuery} />
    }

    return (
      <div className="Search">
        <h1>Class Search</h1>
        <Button class="testbutton" color="primary" onClick={this.toggleNewSearch.bind(this)}>Search</Button>
        <Modal isOpen={this.state.newSearchModal} toggle={this.toggleNewSearch.bind(this)}>
          <ModalHeader toggle={this.toggleNewSearch.bind(this)}>Search for a class code or any topics</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="search">For example: "functional programming"</Label>
              <Input id="search" onKeyPress={e => {
                                  if(e.key === "Enter"){
                                    console.log("enter")
                                    this.routeToSearchPage();
                                  }
                              }} value={this.state.searchQuery} onChange={(e) => {

                this.setState({
                  searchQuery: e.target.value
                });

              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary"   onClick={this.routeToSearchPage.bind(this)}>Search</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewSearch.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div class="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th>SUBJECT</th>
                <th>ID</th>
                <th>TITLE</th>
                <th>Description</th>
                <th>
                  <Label>Term</Label>
                  <Input size="sm" type="select" value={this.state.term} onChange={(e) => {
                    this.setState({
                      term: e.target.value
                    })
                    console.log(this.state.term)
                  }}>
                    <option value="default">All Term</option>
                    <option value="spring2020">Spring 2020</option>
                    <option value="fall2019">Fall 2019</option>
                    <option value="fall2018">Fall 2018</option>
                    <option value="summer2018">Summer 2018</option>
                    <option value="spring2018">Spring 2018</option>
                  </Input>
                </th>
              </tr>
            </thead>

            <tbody>
              {cl}
            </tbody>

          </Table>
        </div>

        <HelpDesk />
      </div>
    );
  }
}

export default withRouter(Search);
