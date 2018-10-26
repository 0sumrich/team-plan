import React, { Component } from "react";
import Chart from "./Chart";
import Grid from "./Grid";
import * as d3 from "d3";

//change to have an update button

class Edit extends Component {
	constructor(props) {
		super(props);
		let data;
		if (IS_BROWSER) {
			data = window.__INITIAL_DATA__;
			delete window.__INITIAL_DATA__;
		} else {
			data = props.staticContext.data;
		}

		if (data) {
			data.csv.forEach(o => (o.edit = false));
		}

		this.state = {
			data: data,
			loading: data ? false : true
		};
		this.fetchData = this.fetchData.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleChangeClick = this.handleChangeClick.bind(this);
	}

	fetchData() {
		this.setState({ loading: true });
		this.props
			.getInitialData()
			.then(data => {
				data.csv.forEach(o => (o.edit = false));
				return data;
			})
			.then(data => this.setState({ data: data, loading: false }));
	}

	handleChangeClick(e) {
		const id = e.target.id.slice("button".length);
		const values = this.state.data.values;
		let csv = this.state.data.csv;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].text = document.getElementById("input" + id).value;
		csv[index].edit = false;
		this.setState({ data: { csv: csv, values: values } });
	}

	handleEditClick(e) {
		const id = e.target.id.slice("button".length);
		const values = this.state.data.values;
		let csv = this.state.data.csv;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].edit = true;
		this.setState({ data: { csv: csv, values: values } });
	}

	componentDidMount() {
		if (!this.state.data) {
			this.fetchData();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.fetchData();
		}
	}

	render() {
		const { data, loading } = this.state;
		const chart = loading ? (
			<p>Loading</p>
		) : (
			<div>
				<Chart data={data} />
				<Grid
					data={data}
					handleEditClick={this.handleEditClick}
					handleChangeClick={this.handleChangeClick}
				/>
			</div>
		);
		return chart;
	}
}

export default Edit;
