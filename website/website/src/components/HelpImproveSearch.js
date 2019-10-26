import React, { Component} from 'react';
import { Form, Input, ListGroup, ListGroupItem, CustomInput, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, Collapse, CardBody, Card, UncontrolledCollapse, FormText, Col, ButtonGroup } from 'reactstrap';
import RateInstructor from './RateInstructor';

export default class HelpDesk extends Component {
    state = {
        searchQuery: "",
        helpDeskModal: false
    }

    toggleHelpDesk() {
        this.setState({
            helpDeskModal: !this.state.helpDeskModal
        });
    }

    render() {
        return (
            <div>
                <Button id="improve-search-button" color="danger" onClick={this.toggleHelpDesk.bind(this)}>Help us improve search</Button>
                <Modal isOpen={this.state.helpDeskModal} toggle={this.toggleHelpDesk.bind(this)}>
                    <ModalHeader toggle={this.toggleHelpDesk.bind(this)}>Help us to reach that "easy A humanities class" search by</ModalHeader>
                    <ModalBody>
                        <Form inline>
                            <FormGroup>
                                <Label for="exampleEmail" hidden>Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="ClassCode" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword" hidden>Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="semester" />
                            </FormGroup>
                        </Form>
                        <ListGroup>
                            <ListGroupItem tag="button" action active>
                                <Label for="exampleCustomFileBrowser">Drop your syllabus here</Label>
                                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
                            </ListGroupItem>
                            <ListGroupItem tag="button" action>Type your syllabus</ListGroupItem>
                            <ListGroupItem tag="button" action>Rate A Class</ListGroupItem>
                            <ListGroupItem tag="button" id="rateInstructor" action>Rate An Instructor</ListGroupItem>
                            <RateInstructor/>

                        </ListGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleHelpDesk.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }

}
