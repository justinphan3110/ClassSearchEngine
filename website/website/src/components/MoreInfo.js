import React, { Component } from 'react'
import { Table,UncontrolledPopover,PopoverHeader,PopoverBody, Button } from 'reactstrap';
import axios from 'axios';

export default class MeetingMoreInfo extends Component {

    //Constructor
    constructor (props) {
        super(props);
        const {term} = this.props;
        const {code} = this.props;
        this.state = {
            term : term,
            code : code,
            collapse : false,

            meetings: []
        };
    }

    getClassInfo(){
        axios.get('http://localhost:8080/class/' + this.state.term + '/' + this.state.code).then((response) => {
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
                    <td>{(c.number)}</td>
                    <td>{c.dayTime}</td>
                    <td>{c.room}</td>
                    <td>{c.instructor}</td>
                </tr>
            )
        });


        return (
            <td>
           <Button id={this.state.code} color="info" size="sm" onClick={this.getClassInfo.bind(this)}>More Info</Button>
           <UncontrolledPopover  placement="bottom" modifiers={{ flip: { behavior: ['bottom'] } }}
                    trigger="legacy" placement="bottom" target={this.state.code}>
            <PopoverBody>
            <Table size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>

            <tbody>{meeting}</tbody>
            </Table>
            </PopoverBody>
          </UncontrolledPopover>
         </td>
        )
    }
}
