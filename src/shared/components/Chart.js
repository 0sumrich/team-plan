import React, { Component } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

class Chart extends Component {

	componentDidMount() {
		const data = this.props.data;
		draw(data.values, data.csv)
	}
	
	componentWillUnmount() {
		d3
			.select("svg")
			.selectAll("*")
			.remove();
	}

	render() {
		return <svg id="svg" />;
	}
}

export default Chart;
