import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import Chart from "../components/Chart";
import Grid from "../components/Grid";
//import editClick from '../components/editFuncs/editClick'

// handleEditClick(e) {
// 		const data = this.state.data;
// 		const id = e.target.id.slice("button".length);
// 		const values = data.values;
// 		let csv = data.csv;
// 		const index = csv.map(o => o._id).indexOf(id);
// 		csv[index].edit = true;
// 		this.setState({ data: { csv: csv, values: values } });
// 	}

function editClick(e, useState){
	const [data, setData] = useState;
	const id = e.target.id.slice("button".length);
	const values = data.values;
	const csv = data.csv;
	const index = csv.map(o => o._id).indexOf(id);
	csv[index].edit = true;
	setData({data: data})
}

function Edit(props) {
	const initData = props.data;
	const [data, setData] = useState(initData);
	const {csv, values} = data;
	
	const editClick = e => {
		const id = e.target.id.slice("button".length);
		const index = csv.map(o => o._id).indexOf(id);
		csv[index].edit = true;
		setData({csv, values});
	}
	return (
		<>
			<Chart data={data} />
			<Grid data={data} handleEditClick={editClick}/>
		</>
	);
}

Edit.getInitialProps = async ({ req }) => {
	const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
	const res = await fetch(baseUrl + "/api");
	const json = await res.json();
	return { data: json };
};

export default Edit;
