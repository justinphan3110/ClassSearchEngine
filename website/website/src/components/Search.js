import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';
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
      defaultTerm: "spring2020",
      term: "spring2020",

      routeToSearch: false,

      // hosting: 'localhost'
      hosting: '34.69.198.55'
    }

    console.log("searchQuery in constructor: " + this.state.searchQuery);

  }

  updateSearch() {
    axios.get('http://' + this.state.hosting + ':8080/search/' 
                + this.state.collection + '/' 
                + this.state.defaultTerm +  '/' 
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
                + this.state.defaultTerm + '/'
                + this.state.searchQuery).then((response) => {
        this.setState({
          class: response.data
        })
      });
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
          <MoreDescription description={c.description} code={(c.subject.toUpperCase()) + c.id} />
          <MeetingMoreInfo term={this.state.term} code={c.subject + c.id} />
        </tr>
      )
    });

    if (this.state.routeToSearch === true) {
      return <Redirect push to={'/search/' + this.state.searchQuery} />
    }

    return (
      <div className="Search">
        <h1>Class Search</h1>
        <Button class="testbutton" color="primary" onClick={this.toggleNewSearch.bind(this)}>Search</Button>
        <Modal isOpen={this.state.newSearchModal} toggle={this.toggleNewSearch.bind(this)}>
          <ModalHeader toggle={this.toggleNewSearch.bind(this)}>Search a Class You Want</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="search">Search</Label>
              <Input id="search" value={this.state.searchQuery} onChange={(e) => {
                this.setState({
                  searchQuery: e.target.value
                });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.routeToSearchPage.bind(this)}>Search</Button>{' '}
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
                  <Input size="sm" type="select" value={this.state.term} onChange={(e) => {
                    this.setState({
                      term: e.target.value
                    })
                  }}>
                    <option value="spring2020">Spring 2020</option>
                    <option value="fall2019">Fall 2019</option>
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
