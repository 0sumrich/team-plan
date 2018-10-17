import React, { Component } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

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
			data: data,
			loading: data ? false : true
		};
		this.fetchData = this.fetchData.bind(this);
	}

	fetchData() {
		this.setState({ loading: true });
		this.props
			.getInitialData()
			.then(data => this.setState({ data: data, loading: false }))
			.then(() => draw(this.state.data.values, this.state.data.csv));
	}

	componentDidMount() {
		if (!this.state.data) {
			console.log("pause");
			this.fetchData();
		} else {
			draw(this.state.data.values, this.state.data.csv);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.fetchData();
		}
	}

	componentWillUnmount() {
		d3
			.select("svg")
			.selectAll("*")
			.remove();
	}

	render() {
		const svg = <svg id="svg" />;
		const loading = <p>loading</p>;
		return this.state.loading ? loading : svg;
	}
}

export default Chart;
