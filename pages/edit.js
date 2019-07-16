import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import Chart from "../components/Chart";
import Grid from "../components/Grid";
import redraw from "../helper/redraw";
import clear from "../helper/clear";

function Edit(props) {
	const initData = props.data;
	const initDeleted = [];
	const [data, setData] = useState(initData);
	const [deleted, setDeleted] = useState(initDeleted);
	const { csv, values } = data;
	const getId = (e, str) => e.target.id.slice(str.length);
	const getIndex = id => csv.map(o => o._id).indexOf(id);

	const editClick = e => {
		const id = getId(e, "button");
		const index = getIndex(id);
		csv[index].edit = true;
		setData({ csv, values });
	};

	const previewClick = e => {
		const id = getId(e, "button");
		const index = getIndex(id);
		csv[index].edit = false;
		setData({ csv, values });
		redraw(values, csv);
	};

	const textChange = e => {
		const id = getId(e, "input");
		const index = getIndex(id);
		const original = csv[index].text;
		csv.forEach(o => {
			if (o.objective == original) {
				o.objective = e.target.value;
			}
		});
		csv[index].text = e.target.value;
		setData({ csv, values });
	};

	const completeChange = e => {
		const id = e.target.name;
		const index = getIndex(id);
		csv[index].complete = e.target.value;
		setData({ csv, values });
	};

	const deleteClick = e => {
		const id = getId(e, "delete");
		const index = getIndex(id);
		const toDelete = csv[index];
		csv.splice(index, 1);
		setData({csv, values})
		setDeleted(prevDeleted => {
			return [...prevDeleted, toDelete];
		});
		
		redraw(values, csv);
	};

	return (
		<>
			<Chart data={data} />
			<Grid
				data={data}
				handleEditClick={editClick}
				handlePreviewClick={previewClick}
				handleTextChange={textChange}
				handleCompleteChange={completeChange}
				handleDeleteClick={deleteClick}
			/>
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
