import React, { Component } from 'react'
import { Table,Collapse,Card,CardBody, Button } from 'reactstrap';
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
        axios.get('http://localhost:8080/class/' + 'fall2019' + '/' + 'eecs132').then((response) => {
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
                <tr>
                    <td>{c.number}</td>
                    <td>{c.dayTime}</td>
                    <td>{c.room}</td>
                    <td>{c.instructor}</td>
                </tr>
            )
        });


        return (
            <td>
           <Button color="info" size="sm" onClick={this.getClassInfo.bind(this)}>More Info</Button>
           <Collapse isOpen={this.state.collapse}>
            <Card>
            <CardBody>
                <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Instructor</th>
                      </tr>
                    </thead>

                    <tbody>
                        {meeting}
                    </tbody>
                </Table>
            </CardBody>
            </Card>
          </Collapse>
         </td>
        )
    }
}
