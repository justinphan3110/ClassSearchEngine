import React from 'react'
import {Form, FormGroup, Input, Label, glyphicon, Button} from 'reactstrap'
import './Class.css'

var Rating = require('react-rating')

const ListTag = [{id: 1, value: "gives good feedback"}, {id: 2, value: "respected"},
  {id: 3, value: "lots of homework"}, {id: 4, value: "accessible outside class"}, 
  {id: 5, value: "get ready to read"},{id: 6, value: "participation matters"}, 
  {id: 7, value:"skip class? you won't pass"},{id: 8, value: "inspirational"}, 
  {id: 9, value: "graded by few things"}, {id: 10, value: "test heavy"},
  {id: 11, value: "group projects"}, {id: 12, value: "clear grading criteria"}, 
  {id: 13, value: "hilarious"}, {id: 14, value: "beware of pop quizzes"}, 
  {id: 15, value: "amazing lectures"}, {id: 16, value: "lecture heavy"},
  {id: 17, value: "caring"}, {id: 18, value: "extra credit"}, 
  {id: 19, value: "so many papers"}, {id: 20, value: "tough grader"}];
export default class Class extends React.Component {
  
  // Constructor
  constructor(props){
    super(props);
    const {code} = this.props;
    this.state = {
      code,
      instructor: '',
      ListTag: [...ListTag.map(tag => {return {...tag, selected: false }})],
      term: '',
      color: {true: 'lightblue', false: 'lightgray'},
      rate: 0,
      comment: ''
    };

    //console.log(code)
  }

  handleTermChange = (e) => {
    let {term} = this.state;
    term = e.target.value;
    this.setState({term});
  }
  

  

  handleInstructorChange = (e) => {
    let {instructor} = this.state;
    instructor = e.target.value;
    this.setState({instructor});
  }


  toggleSelectTag = (idx) => {
    const {ListTag} = this.state;
    ListTag[idx].selected = !ListTag[idx].selected;
    this.setState({ListTag});
  }

  renderTag = (tag, idx) => {
    return <code style={{background: this.state.color[this.state.ListTag[idx].selected], 
    cursor: 'pointer'}} onClick={() => this.toggleSelectTag(idx)}>
      {tag.value}
      </code>
  }
 /*
  var rating = 0;
  return <Rating
  stop ='5'
  initialRating='0'
  step='1'
  emptySymbol={['fa fa-star-o fa-2x', 'fa fa-star-o fa-2x',
  'fa fa-star-o fa-2x', 'fa fa-star-o fa-2x',
  'fa fa-star-o fa-2x']}
  fullSymbol={['fa fa-star fa-2x', 'fa fa-star fa-2x',
  'fa fa-star fa-2x', 'fa fa-star fa-2x',
  'fa fa-star fa-2x']}
  onChange={(rate) => {rating = rate}}
  />
  */

  toggleStar5() {
    this.setState({rate: 5});
  }
  toggleStar4() {
    this.setState({rate: 4});
  }
  toggleStar3() {
    this.setState({rate: 3});
  }
  toggleStar2() {
    this.setState({rate: 2});
  }
  toggleStar1() {
    this.setState({rate: 1});
  }

  renderRating() {
    return <div class="stars">
    <input class="star star-5" id="star-5" type="radio" name="star" onClick={() => this.toggleStar5()}/>
    <label class="star star-5" for="star-5"></label>
    <input class="star star-4" id="star-4" type="radio" name="star" onClick={() => this.toggleStar4()}/>
    <label class="star star-4" for="star-4"></label>
    <input class="star star-3" id="star-3" type="radio" name="star" onClick={() => this.toggleStar3()}/>
    <label class="star star-3" for="star-3"></label>
    <input class="star star-2" id="star-2" type="radio" name="star" onClick={() => this.toggleStar2()}/>
    <label class="star star-2" for="star-2"></label>
    <input class="star star-1" id="star-1" type="radio" name="star" onClick={() => this.toggleStar1()}/>
    <label class="star star-1" for="star-1"></label>
  </div>
  }

  handleCommentChange = (e) => {
    let {comment} = this.state;
    comment = e.target.value;
    this.setState({comment});
  } 

  handleRateChange = (rate) => {
    this.setState({rate: rate});
  }

  handleSubmit = (e) => {
    let ListTag = this.state.ListTag;
    var tags = [];
    for (var i = 0; i < ListTag.length; i++) {
      if (ListTag[i].selected)
        tags.push(ListTag[i].value);  
    };
    console.log(this.state.term);
    console.log(this.state.instructor);
    console.log(this.state.comment);
    console.log(this.state.rate);
    console.log(tags);
  }
  /*
 
*/
 
  render() {
    //console.log("in class")
    const {ListTag} = this.state;
    var rating = 0;
    return(
      <div className="animated fadeIn">
        <div className="rating">
          <div className="rating-header">
            <h2 style={{textTransform: "uppercase"}}>Class {this.state.code}</h2>
          </div>
          <div className="rating-body">
            <Form>
              <FormGroup>
                <Label>When did you take this class?</Label>
                <Input
                  type="text"
                  name="term"
                  placeholder="e.g. Fall 2018, Spring 2019"
                  onChange={this.handleTermChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Instructor</Label>
                <Input
                  type="text"
                  name="instructor"
                  placeholder="Who did you take this class with?"
                  onChange={this.handleInstructorChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Tag</Label>
                <div>
                  {ListTag.map((tag, idx) => {
                    return this.renderTag(tag, idx);
                  })}
                </div>
              </FormGroup>
              <FormGroup>
                <Label>More specific comment</Label>
                <Input
                  type="text"
                  name="comment"
                  placeholder="Your comment..."
                  onChange={this.handleCommentChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Rating</Label>
                <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"/>
                <div>
                  {this.renderRating()}
                </div>
              </FormGroup>
                
            </Form>
          </div>
        </div>
        <p className="text-center">
          <Button color="primary" className="px-4" onClick={this.handleSubmit}>
            Submit
          </Button>
        </p>
      </div>
    )
  }
}
