import React, { Component } from "react";
import draw from "../helper/draw";

class Chart extends Component {
	constructor(props) {
		super(props);
		//d = window.__INITIAL_DATA__ || props.staticContext.data
		//this.state = {data: d}
	}

	render() {
		return <svg id="svg"></svg>;
	}
}

export default Chart;
