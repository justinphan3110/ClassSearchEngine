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
        // console.log(code);
    }


    getClassInfo(term, code){
        axios.get('http://localhost:8080/class/' + term + '/' + code).then((response) => {
            this.setState({
                meetings: response.data
            })
        });

        this.setState({
            collapse : !this.state.collapse
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.code !== prevProps.code
             || this.props.term !== prevProps.term) {
            this.setState({
                code: this.props.code,
                term: this.props.term
            });
        }
    }

    render() {
        let meeting = this.state.meetings.map((c) => {
            
            return (
                <tr>
                    <td>{(c.number)}</td>
                    <td>{c.dayTime}</td>
                    <td>{c.room}</td>
                    <td>{c.instructor}</td>
                    <td>{c.component}</td>
                </tr>
            )
        });


        return (
            <td>
           <Button id={this.state.code} color="info" size="sm" onClick={this.getClassInfo.bind(this, this.state.term, this.state.code)}>More Info</Button>
           <UncontrolledPopover  placement="bottom" modifiers={{ flip: { behavior: ['bottom'] } }}
                    trigger="legacy" placement="bottom" target={this.state.code}>
            <PopoverBody>
            <Table size="sm">
            <thead key={this.state.code}>
                <tr>
                <th>#</th>
                <th>Time</th>
                <th>Room</th>
                <th>Instructor</th>
                <th>Component</th>
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
