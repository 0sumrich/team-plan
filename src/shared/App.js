import React, { Component } from 'react';
import Chart from './components/Chart';
import Button from './components/Button';
import { saveSvgAsPng } from 'save-svg-as-png';
//import saveSvgAsPng from './helper/saveAsPng';

/*
  // Set-up the export button
  d3.select('#saveButton').on('click', function(){
    saveSvgAsPng(document.getElementById("svg"), "diagram.png", {scale: 8, backgroundColor: 'white'});
  });
  */

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data: {
        csv: [],
        values: []
      }
    };
    this.handlePngClick=this.handlePngClick.bind(this);
  }
  
  handlePngClick(){
    console.log(saveSvgAsPng);
    saveSvgAsPng(document.getElementById("svg"), "diagram.png", {scale: 8, backgroundColor: 'white'});
  }
  
  componentDidMount(){    
    const data = this.props.data;
    this.setState({data: data});
  }
  
  render() {
    const style={
      width: "95vw",
      height: "95vw"
    }
    return (
      <div style={style}>
        <h1>Nav goes here</h1>
        <Button id="saveButton" click={this.handlePngClick}>Export as PNG</Button>
        <Chart data={this.state.data} />
      </div>
    )
  }
}

export default App