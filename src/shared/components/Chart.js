import React, { Component } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

function compare(array1, array2) {
	if (array1.length == array2.length) {
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) return false;
		}
		return true;
	} else {
		return false;
	}
}

class Chart extends Component {
	componentDidMount() {
		const data = this.props.data;
		draw(data.values, data.csv);
	}

	componentDidUpdate(prevProps) {
		const id = "5ba62311315a8a0f7091a896"
		const data = this.props.data;
		const csv = data.csv;
		const oldCsv = prevProps.data.csv;
		const index = csv.map(o => o._id).indexOf(id);
		console.log(csv[index], oldCsv[index]);
		if(this.props.data.csv!==prevProps.data.csv){
			const data = this.props.data;
			draw(data.values, data.csv);
		};
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
