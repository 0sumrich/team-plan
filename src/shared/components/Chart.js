import React, { Component } from 'react';
import draw from '../helper/draw';

class Chart extends Component {
  
  componentDidUpdate(prevProps){
    if (this.props.data !== prevProps.data) {      
      //const values = createCircles(this.props.data.values, valuesRadius);
      draw(this.props.data.values, this.props.data.csv);
    }
  }
  
  render () {
    return <svg id="svg"></svg>
  }
}

export default Chart