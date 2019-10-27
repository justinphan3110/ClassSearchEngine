import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import { Container, Table,UncontrolledPopover,Row, Col, PopoverBody, Button } from 'reactstrap';
import axios from 'axios';


class MeetingMoreInfo extends Component {

    //Constructor
    constructor (props) {
        super(props);
        const {term} = this.props;
        const {code} = this.props;
        this.state = {
            term : term,
            code : code,
            collapse : false,
            routeToClassInfo :false,
            meetings: [],

            // hosting: 'localhost'
             hosting: '34.69.198.55'
        };

        this.routeToClassPage = this.routeToClassPage.bind(this);
    }


    getClassInfo(){
        axios.get('http://' + this.state.hosting + ':8080/class/' + this.state.term + '/' + this.state.code).then((response) => {
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

    routeToClassPage(){
        this.setState({
            routeToClassInfo : ! this.state.routeToClassInfo
        });
        // this.props.history.push('/class/' + this.state.code);
    }


    render() {
        let meeting = this.state.meetings.map((c) => {
            
            return (
                <tr key={this.state.code + c.number}>
                    <td>{(c.number)}</td>
                    <td>{c.dayTime}</td>
                    <td>{c.room}</td>
                    <td>{c.instructor}</td>
                    <td>{c.component}</td>
                </tr>
            )
        });
        
        if(this.state.routeToClassInfo === true){
            return <Redirect push to={'/class/' + this.state.code} />
        }

        return (
            <td>
            <Container>
            <Row>
            <Col>
           <Button id={this.state.code} color="info" size="sm" onClick={this.getClassInfo.bind(this)}>Meeting Info</Button>
           <UncontrolledPopover  placement="bottom"  
                    trigger="legacy" flip={false} modifiers={{preventOverflow: {boundariesElement: "viewport"}}} target={this.state.code}>
            <PopoverBody>
            <Table size="sm" >
            <thead key={this.state.code + "header"}>
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
            </Col>
            {/* <Col><Button size="sm" color="primary" onClick={this.routeToClassPage}>Comment and Rating</Button></Col> */}
          </Row>
          </Container>
         </td>
        )
    }
}

export default withRouter(MeetingMoreInfo)