import React, { Component } from 'react'
import {UncontrolledPopover, PopoverHeader, PopoverBody, Button } from 'reactstrap';

export default class MoreDescription extends Component {

    //Constructor
    constructor (props){
        super(props);
        const {description} = this.props;
        const {code} = this.props;
        this.state = {
            description : description,
            code: code,
            popoverOpen: true
        };
    }

    toggle(){
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
        console.log(this.state.description)
    }

    render() {
        return (
            <td>
              <Button id={this.state.code} type="button">
                Class Description
              </Button>
              <UncontrolledPopover  placement="bottom" modifiers={{ flip: { behavior: ['bottom'] } }}
                    trigger="legacy" placement="bottom" target={this.state.code}>
                <PopoverHeader>{this.state.code}</PopoverHeader>
                    <PopoverBody>
                        {this.state.description} </PopoverBody>
              </UncontrolledPopover>
            </td>
        )
    }
}
