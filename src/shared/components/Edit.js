import React, { Component } from "react";
import Chart from "./Chart";
import Grid from "./Grid";
import redraw from '../helper/redraw';

//TO DO 
//add delete function
//edit objectives
//create save - post funnction
//if there's more than one edit as true - remove them all
//DONE??

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
		this.handlePreviewClick = this.handlePreviewClick.bind(this);
		this.handleCompleteChange = this.handleCompleteChange.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
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
				this.setState({ data: data, loading: false })
			);
	}

	handlePreviewClick(e) {
		const id = e.target.id.slice("button".length);
		const values = this.state.data.values;
		let csv = this.state.data.csv;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].edit = false;
		this.setState({ data: { csv: csv, values: values } });
		redraw(values, csv);
	}

	handleEditClick(e) {
		const data = this.state.data;
		const id = e.target.id.slice("button".length);
		const values = data.values;
		let csv = data.csv;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].edit = true;
		this.setState({ data: { csv: csv, values: values } });
	}

	handleCompleteChange(e) {
		const data = this.state.data;
		let csv = data.csv;
		const values = data.values;
		const id = e.target.name;
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].complete = e.target.value;
		this.setState({
			data: { csv: csv, values: values }
		});
	}

	handleDeleteClick(e){
		console.log(e.target.id);
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
					handlePreviewClick={this.handlePreviewClick}
					handleCompleteChange={this.handleCompleteChange}
					handleDeleteClick={this.handleDeleteClick}
				/>
			</div>
		);
		return chart;
	}
}

export default Edit;
