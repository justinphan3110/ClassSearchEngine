import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Table,Collapse,Card,CardBody, Button } from 'reactstrap';
import axios from 'axios';

export default class MeetingMoreInfo extends Component {

    //Constructor
    constructor (props) {
        super(props);
        const {term} = this.props;
        const {code} = this.props;
        this.state = {
            term : 'fall2019',
            code : 'eecs132',
            collapse : false,

            meetings: []
        };
    }

    getClassInfo(){
        axios.get('http://localhost:8080/class/' + 'fall2019' + '/' + 'acct101').then((response) => {
            this.setState({
                meetings: response.data
            })
        });

        this.setState({
            collapse : !this.state.collapse
        })
    }

    render() {
        let meeting = this.state.meetings.map((c) => {
            
            return (
                <div> 
                    <ListGroupItem>{c.number}</ListGroupItem>
                    <ListGroupItem>{c.dayTime}</ListGroupItem>
                    <ListGroupItem>{c.room}</ListGroupItem>
                    <ListGroupItem>{c.instructor}</ListGroupItem>
                </div>
            )
        });


        return (
            <td>
           <Button color="info" size="sm" onClick={this.getClassInfo.bind(this)}>More Info</Button>
           <Collapse isOpen={this.state.collapse}>
            <Card size="sm">
            <CardBody>
            <ListGroup size="sm">
                {meeting}
            </ListGroup>
            </CardBody>
            </Card>
          </Collapse>
         </td>
        )
    }
}
