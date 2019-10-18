import React, { Component } from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody, ListGroupItem, Table,Collapse,Card,CardBody, Button } from 'reactstrap';
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
                <div> Class
                    <ListGroupItem>{c.number}</ListGroupItem>
                    <ListGroupItem>{c.dayTime}</ListGroupItem>
                    <ListGroupItem>{c.room}</ListGroupItem>
                    <ListGroupItem>{c.instructor}</ListGroupItem>
                </div>
            )
        });


        return (
            <td>
             <Button id="PopoverLegacy" type="button">
                 Class Info
            </Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader>Legacy Trigger</PopoverHeader>
                    <PopoverBody>
                        Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
            </UncontrolledPopover>
         </td>
        )
    }
}
