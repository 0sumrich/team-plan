import React, { Component } from "react";
import draw from "../helper/draw";
import fetch from 'isomorphic-unfetch';
import * as d3 from "d3";

// class Chart extends Component {

// 	componentDidMount() {
// 		const data = this.props.data;
// 		draw(data.values, data.csv);
// 	}

// 	componentWillUnmount() {
// 		d3
// 			.select("svg")
// 			.selectAll("*")
// 			.remove();
// 	}

// 	render() {
// 		return <svg id="svg" />;
// 	}
// }

class Chart extends Component {

	componentWillUnmount() {
		d3.select("svg")
			.selectAll("*")
			.remove();
	}

	render() {
		return <div>{this.props.data.csv[0].objective}</div>
	}
}

export default Chart;
