import React, { Component} from 'react';
import { Form, Input, ListGroup, ListGroupItem, CustomInput, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, Collapse, CardBody, Card, UncontrolledCollapse, FormText, Col, ButtonGroup } from 'reactstrap';


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
                            <ListGroupItem tag="button" id="rateInstructorToggler" action>Rate An Instructor</ListGroupItem>

                            <UncontrolledCollapse toggler="#rateInstructorToggler">
                              <Card>
                                <CardBody>
                                <Form>
                                    <FormGroup row>
                                      <Label for="professorNameFirst">Professor Name</Label>
                                    </FormGroup>
                                    <FormGroup row>
                                      <Col sm={50}>
                                          <Input type="text" name="professorNameFirst" id="professorNameFirst" placeholder="First" />
                                      </Col>
                                      <Col sm={50}>
                                          <Input type="text" name="professorNameLast" id="professorNameLast" placeholder="Last" />
                                      </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                      <Label for="courseCode">Course Code</Label>
                                    </FormGroup>
                                    <FormGroup row>
                                      <Input type="text" name="courseCode" id="courseCode" placeholder="ex. EECS132" />
                                    </FormGroup>

                                    <FormGroup row>
                                      <Label for="personalityRating">Personality Rating</Label>
                                    </FormGroup>
                                    <FormGroup row>
                                      <ButtonGroup>
                                        <Button>1</Button>
                                        <Button>2</Button>
                                        <Button>3</Button>
                                        <Button>4</Button>
                                        <Button>5</Button>
                                        <Button>6</Button>
                                        <Button>7</Button>
                                        <Button>8</Button>
                                        <Button>9</Button>
                                        <Button>10</Button>
                                      </ButtonGroup>
                                    </FormGroup>

                                    <FormGroup row>
                                      <Label for="teachingQualityRating">Teaching Quality Rating</Label>
                                    </FormGroup>
                                    <FormGroup row>
                                      <ButtonGroup>
                                        <Button>1</Button>
                                        <Button>2</Button>
                                        <Button>3</Button>
                                        <Button>4</Button>
                                        <Button>5</Button>
                                        <Button>6</Button>
                                        <Button>7</Button>
                                        <Button>8</Button>
                                        <Button>9</Button>
                                        <Button>10</Button>
                                      </ButtonGroup>
                                    </FormGroup>

                                    <FormGroup row>
                                      <Label for="difficultyRating">Difficulty Rating (1 = Very Easy, 10 = Very Hard)</Label>
                                    </FormGroup>
                                    <FormGroup row>
                                      <ButtonGroup>
                                        <Button>1</Button>
                                        <Button>2</Button>
                                        <Button>3</Button>
                                        <Button>4</Button>
                                        <Button>5</Button>
                                        <Button>6</Button>
                                        <Button>7</Button>
                                        <Button>8</Button>
                                        <Button>9</Button>
                                        <Button>10</Button>
                                      </ButtonGroup>
                                    </FormGroup>

                                  </Form>
                                </CardBody>
                              </Card>
                            </UncontrolledCollapse>
                        </ListGroup>

                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" onClick={this.routeToSearchPage.bind(this)}>Search</Button>{' '} */}
                        <Button color="secondary" onClick={this.toggleHelpDesk.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
