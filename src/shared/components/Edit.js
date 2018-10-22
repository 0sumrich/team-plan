import React, { Component } from "react";
import Chart from './Chart';
import Grid from './Grid';

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
	}

	componentDidMount(){
		if(!this.state.data){
			this.fetchData();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.fetchData();
		}
	}

	render() {
		const {data, loading} = this.state;
		const chart = loading ? <p>Loading</p> : <Chart data={data} /> 
		return (
			<div>
				{chart}
				<Grid data={data} />
			</div>
		)
	}
}

export default Edit;
