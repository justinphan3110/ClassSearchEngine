import React, { Component} from 'react';

import { Form, Input, ListGroup, ListGroupItem, CustomInput, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, Collapse, CardBody, Card, UncontrolledCollapse, FormText, Col, ButtonGroup } from 'reactstrap';


export default class RateInstructor extends Component {
    state = {
      instructorNameFirst: "",
      instructorNameLast: "",
      personalityRating: "",
      teachingQualityRating: "",
      difficultyRating : "",
      wouldTakeAgain : "",
      textbookNeeded : "",
      attendanceNeeded : "",
      gradeReceived : "",
      instructorTags: Array(3).fill(""),
      additionalComment: "",
    }
    /*
    handleRateInstructorSubmit = async (event) => {
       event.preventDefault();
       const resp = await axios.get(`https://api.github.com/users/${this.state.companyName}`);
       this.props.onSubmit(resp.data);
       this.setState({ companyName: '' });
     };
     */

    saySomething(something) {
        console.log(something);
    }

    render() {
        return (
          <div>
          <UncontrolledCollapse toggler="#rateInstructor">
            <Card>
              <CardBody>
              <Form>
                  <FormGroup row>
                    <Label for="instructorNameFirstLast">Instructor Name</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={50}>
                        <Input
                          type="text"
                          value={this.state.instructorNameFirst}
                          onChange={() => this.setState({ instructorNameFirst: event.target.value })}
                          name="instructorNameFirst"
                          id="instructorNameFirst"
                          placeholder="First" />
                    </Col>
                    <Col sm={50}>
                        <Input
                          type="text"
                          value={this.state.instructorNameLast}
                          onChange={event => this.setState({ instructorNameLast: event.target.value })}
                          name="instructorNameLast"
                          id="instructorNameLast"
                          placeholder="Last" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="courseCode">Course Code</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Input
                      type="text"
                      value={this.state.courseCode}
                      onChange={event => this.setState({ courseCode: event.target.value })}
                      name="courseCode"
                      id="courseCode"
                      placeholder="ex. EECS132" />
                  </FormGroup>

                  <FormGroup row>
                    <Label for="personalityRating">Personality Rating</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="personalityRating">
                      <Button onClick={() => this.setState({personalityRating: 1})}>1</Button>
                      <Button onClick={() => this.setState({personalityRating: 2})}>2</Button>
                      <Button onClick={() => this.setState({personalityRating: 3})}>3</Button>
                      <Button onClick={() => this.setState({personalityRating: 4})}>4</Button>
                      <Button onClick={() => this.setState({personalityRating: 5})}>5</Button>
                      <Button onClick={() => this.setState({personalityRating: 6})}>6</Button>
                      <Button onClick={() => this.setState({personalityRating: 7})}>7</Button>
                      <Button onClick={() => this.setState({personalityRating: 8})}>8</Button>
                      <Button onClick={() => this.setState({personalityRating: 9})}>9</Button>
                      <Button onClick={() => this.setState({personalityRating: 10})}>10</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="teachingQualityRating">Teaching Quality Rating</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="teachingQualityRating">
                      <Button onClick={() => this.setState({teachingQualityRating: 1})}>1</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 2})}>2</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 3})}>3</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 4})}>4</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 5})}>5</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 6})}>6</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 7})}>7</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 8})}>8</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 9})}>9</Button>
                      <Button onClick={() => this.setState({teachingQualityRating: 10})}>10</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="difficultyRating">Difficulty Rating (1 = Very Easy, 10 = Very Hard)</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="difficultyRating">
                      <Button onClick={() => this.setState({difficultyRating: 1})}>1</Button>
                      <Button onClick={() => this.setState({difficultyRating: 2})}>2</Button>
                      <Button onClick={() => this.setState({difficultyRating: 3})}>3</Button>
                      <Button onClick={() => this.setState({difficultyRating: 4})}>4</Button>
                      <Button onClick={() => this.setState({difficultyRating: 5})}>5</Button>
                      <Button onClick={() => this.setState({difficultyRating: 6})}>6</Button>
                      <Button onClick={() => this.setState({difficultyRating: 7})}>7</Button>
                      <Button onClick={() => this.setState({difficultyRating: 8})}>8</Button>
                      <Button onClick={() => this.setState({difficultyRating: 9})}>9</Button>
                      <Button onClick={() => this.setState({difficultyRating: 10})}>10</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="wouldTakeAgain">Would you take this class again?</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="wouldTakeAgain">
                      <Button onClick={() => this.setState({wouldTakeAgain: 1})}>Yes</Button>
                      <Button onClick={() => this.setState({wouldTakeAgain: 0})}>No</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="textbookNeeded">Did you need to get the "required" textbooks for this class?</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="textbookNeeded">
                      <Button onClick={() => this.setState({textbookNeeded: 1})}>Yes</Button>
                      <Button onClick={() => this.setState({textbookNeeded: 0})}>No</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="attendanceNeeded">Did attendace count for a grade in this class?</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="attendanceNeeded">
                      <Button onClick={() => this.setState({attendanceNeeded: 1})}>Yes</Button>
                      <Button onClick={() => this.setState({attendanceNeeded: 0})}>No</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="gradeReceived">Did attendace count for a grade in this class?</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="gradeReceived">
                      <Button onClick={() => this.setState({gradeReceived: 1})}>A</Button>
                      <Button onClick={() => this.setState({gradeReceived: 2})}>B</Button>
                      <Button onClick={() => this.setState({gradeReceived: 3})}>C</Button>
                      <Button onClick={() => this.setState({gradeReceived: 4})}>D</Button>
                      <Button onClick={() => this.setState({gradeReceived: 5})}>F</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="gradeReceived">Did attendace count for a grade in this class?</Label>
                  </FormGroup>
                  <FormGroup row>
                    <ButtonGroup name="gradeReceived">
                      <Button onClick={() => this.setState({gradeReceived: 1})}>A</Button>
                      <Button onClick={() => this.setState({gradeReceived: 2})}>B</Button>
                      <Button onClick={() => this.setState({gradeReceived: 3})}>C</Button>
                      <Button onClick={() => this.setState({gradeReceived: 4})}>D</Button>
                      <Button onClick={() => this.setState({gradeReceived: 5})}>F</Button>
                    </ButtonGroup>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="instructorNameFirstLast">Any additional comments?</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Input
                      type="text"
                      value={this.state.additionalComment}
                      onChange={event => this.setState({ additionalComment: event.target.value })}
                      name="additionalComment"
                      id="additionalComment"
                       />
                  </FormGroup>
                </Form>

                <button type="button" class="btn btn-primary" onClick={() => this.saySomething("submitted!")}>Submit Instructor Rating</button>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          </div>
        )
    }

}


//-------------------------------------------------------------------------------------------------------------------------

/*
import React, { Component} from 'react';
import { Form, Input, ListGroup, ListGroupItem, CustomInput, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, Collapse, CardBody, Card, UncontrolledCollapse, FormText, Col, ButtonGroup } from 'reactstrap';

class RateInstructor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      instructorNameFirst: null,
      instructorNameLast: null,
      personalityRating: null,
      teachingQualityRating: null,
      difficultyRating : null,
      wouldTakeAgain : null,
      textbookNeeded : null,
      attendanceNeeded : null,
      gradeReceived : null,
      instructorTags: Array(3).fill(null),
      instructorComment: null,
    };
  }

  render(){
    return(
      <div>
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
                <ButtonGroup name="personalityRating">
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
      </div>
    )
  }
}
*/
