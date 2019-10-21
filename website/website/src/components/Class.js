import React from 'react'

export default class Class extends React.Component {
  
  // Constructor
  constructor(props){
    super(props);
    const {code} = this.props;
    this.state = {
      code
    };

    console.log(code)
  }
 
 
  render() {
    console.log("in class")
    return <h1>Class {this.state.code}</h1>
  }
}
