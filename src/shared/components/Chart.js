import React, { Component } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

class Chart extends Component {
	componentDidMount() {
		const data = this.props.data;
		draw(data.values, data.csv);
	}

	componentWillUnmount() {
		d3.select("svg")
			.selectAll("*")
			.remove();
	}

	render() {
		return <svg id="svg" />;
	}
}

Chart.getInitialProps = async ({ req }) => {
	const res = await fetch("/api");
	const json = await res.json();
	return { data: json };
};

export default Chart;
