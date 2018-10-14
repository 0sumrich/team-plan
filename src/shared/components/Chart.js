import React, { Component } from "react";
import draw from "../helper/draw";

class Chart extends Component {
	constructor(props) {
		super(props);
		let data;
		if (IS_BROWSER) {
			data = window.__INITIAL_DATA__;
			delete window.__INITIAL_DATA__;
		} else {
			data = props.staticContext.data;
		}

		this.state = {
			data
		}
	};

	componentDidMount(){
		draw(this.state.data.values, this.state.data.csv);
	}

	render() {
		return <svg id="svg"></svg>;
	}
}

export default Chart;