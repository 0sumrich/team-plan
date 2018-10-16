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
			data = this.props.staticContext.data;
		}

		this.state = {
			data: data,
			loading: data ? false : true,
			browser: IS_BROWSER ? true : false
		};

		this.getData = this.getData.bind(this);
	}

	getData() {
		this.setState(() => ({ loading: true }));
		this.props.getInitialData().then(data =>
			this.setState({
				data: data,
				loading: false
			})
		);
	}

	componentDidMount() {
		draw(this.state.data.values, this.state.data.csv)
	}

	componentDidUpdate(prevProps, prevState) {
	}
	

	render() {	
		const svg = <svg id="svg" />;
		const loading = <p>loading</p>;
		return svg//this.state.loading ? loading : svg;
	}
}


export default Chart;
