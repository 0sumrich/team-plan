import React, { Component } from "react";
import Chart from "./Chart";
import Grid from "./Grid";
import Button from "./Button";
import redraw from "../helper/redraw";

//TO DO
//sort button active

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
			backup: data,
			loading: data ? false : true,
			deleted: []
		};
		this.fetchData = this.fetchData.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handlePreviewClick = this.handlePreviewClick.bind(this);
		this.handleCompleteChange = this.handleCompleteChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
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
				this.setState({ data: data, backup: data, loading: false })
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

	handleTextChange(e) {
		let data = this.state.data;
		let csv = data.csv;
		const values = data.values;
		const id = e.target.id.slice("input".length);
		const index = csv.map(o => o._id).indexOf(id);
		const original = csv[index].text;
		csv.forEach(o => {
			if (o.objective == original) {
				o.objective = e.target.value;
			}
		});
		csv[index].text = e.target.value;
		this.setState({
			data: { csv: csv, values: values }
		});
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

	handleDeleteClick(e) {
		let data = this.state.data;
		let csv = data.csv;
		const values = data.values;
		const id = e.target.id.slice("delete".length);
		const index = csv.map(o => o._id).indexOf(id);
		const deleted = csv[index];
		csv.splice(index, 1);
		this.setState(prevState => {
			return {
				data: { csv, values },
				deleted: [...prevState.deleted, deleted]
			};
		});
		redraw(values, csv);
	}

	handleAddClick(team, objective) {

		const body = {
			text: "Edit me",
			team: team,
			objective: objective,
			complete: "FALSE"
		};

		const addTask = () =>
			fetch("/addTask", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});

		addTask()
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					alert(error);
				} else {
					redraw(this.state.data.values, [
						...this.state.data.csv,
						res
					]);
					this.setState(prevState => {
						return {
							data: {
								csv: [...prevState.data.csv, res],
								values: prevState.data.values
							}
						};
					});
				}
			});
	}

	handleSaveClick(e) {
		const update = () =>
			fetch("/update", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(this.state.data.csv)
			});
		const backup = () =>
			fetch("/backup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(this.state.backup.csv)
			});

		const del = () =>
			fetch("/delete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(this.state.deleted)
			});

		Promise.all([
			update(),
			backup(),
			this.state.deleted.length > 0 ? del() : null
		]).then(res => {
			const arr = res.filter(o => o && o.status==200);
			arr.length<2 ? alert('Error - please try later') : alert('Saved!')
		});

		this.setState(prevState => {
			return { backup: prevState.data, deleted: [] };
		});

		redraw(this.state.data.values, this.state.data.csv);
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
		const res = loading ? (
			<p>Loading</p>
		) : (
			<div>
				<Chart data={data} />
				<Button
					id="save"
					position="sticky"
					bg={["blue", "grey"]}
					color="white"
					border="white"
					handleClick={this.handleSaveClick}
				>
					Save
				</Button>
				<Grid
					data={data}
					handleEditClick={this.handleEditClick}
					handlePreviewClick={this.handlePreviewClick}
					handleCompleteChange={this.handleCompleteChange}
					handleDeleteClick={this.handleDeleteClick}
					handleTextChange={this.handleTextChange}
					handleAddClick={this.handleAddClick}
				/>
			</div>
		);
		return res;
	}
}

export default Edit;
