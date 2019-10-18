import React, { Component } from 'react'
import { Collapse,Card,CardBody, Button } from 'reactstrap';

export default class MeetingMoreInfo extends Component {
    state = {
        collapse: false,
    }

    toggle = () => {
        this.setState({
            collapse : !this.state.collapse
        })
    }

    render() {
        return (
            <td>
           <Button color="info" size="sm" onClick={this.toggle}>More Info</Button>
           <Collapse isOpen={this.state.collapse}>
            <Card>
            <CardBody>
              nooo
            </CardBody>
            </Card>
          </Collapse>
         </td>
        )
    }
}
