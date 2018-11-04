import React, { Component } from "react";
import Chart from "./Chart";
import Grid from "./Grid";
import draw from "../helper/draw";
import * as d3 from "d3";

//change to have an update button

//Needs tidying up - ONLY ONE STATE NOW PLEASE

function reDraw(values, csv){
			d3
			.select("svg")
			.selectAll("*")
			.remove();
			draw(values, csv);
}

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
			newData: data,
			loading: data ? false : true
		};
		this.fetchData = this.fetchData.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleUpdateClick = this.handleUpdateClick.bind(this);
		this.handleCompleteChange = this.handleCompleteChange.bind(this);
	}

	fetchData() {
		this.setState({ loading: true });
		this.props
			.getInitialData()
			.then(data => {
				data.csv.forEach(o => (o.edit = false));
				return data;
			})
			.then(data =>
				this.setState({ data: data, newData: data, loading: false })
			);
	}

	handleUpdateClick(e) {
		const id = e.target.id.slice("button".length);
		const values = this.state.newData.values;
		let csv = this.state.newData.csv;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].edit = false;
		this.setState({ data: { csv: csv, values: values } });
		reDraw(values, csv);
	}

	handleEditClick(e) {
		const data = this.state.newData;
		const id = e.target.id.slice("button".length);
		const values = data.values;
		let csv = data.csv;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].edit = true;
		this.setState({ newData: { csv: csv, values: values } });
	}

	handleCompleteChange(e) {
		const data = this.state.newData;
		let csv = data.csv;
		const values = data.values;
		const id = e.target.name;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].complete = e.target.value;
		this.setState({
			newData: { csv: csv, values: values }
		});
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
		const { data, newData, loading } = this.state;
		const chart = loading ? (
			<p>Loading</p>
		) : (
			<div>
				<Chart data={data} />
				<Grid
					data={newData}
					handleEditClick={this.handleEditClick}
					handleUpdateClick={this.handleUpdateClick}
					handleCompleteChange={this.handleCompleteChange}
				/>
			</div>
		);
		return chart;
	}
}

export default Edit;
