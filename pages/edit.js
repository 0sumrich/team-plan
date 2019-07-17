import React, { Fragment, useState } from "react";
import fetch from "isomorphic-unfetch";
import Chart from "../components/Chart";
import Grid from "../components/Grid";
import Button from "../components/Button";
import redraw from "../helper/redraw";
import clear from "../helper/clear";
import addObjective from "../helper/addObjective";

function Edit(props) {
	const initData = props.data;
	const initDeleted = [];
	const initBackup = {};
	const [data, setData] = useState(initData);
	const [deleted, setDeleted] = useState(initDeleted);
	const [backup, setBackup] = useState(initBackup);
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
		setData({ csv, values });
		setDeleted(prevDeleted => {
			return [...prevDeleted, toDelete];
		});

		redraw(values, csv);
	};

	const addObjectiveClick = e => {
		const newCsv = addObjective(csv);
		setData({ csv: newCsv, values: values });
		redraw(values, newCsv);
	};

	const addClick = (team, objective) => {
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
					alert(res.error);
				} else {
					const newCsv = [...csv, res];
					setData({ csv: newCsv, values: values });
					redraw(values, newCsv);
				}
			});
	};

	const saveClick = e => {
		const update = () =>
			fetch("/update", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(csv)
			});
		const backup = () =>
			fetch("/backup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(csv)
			});

		const del = () =>
			fetch("/delete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(deleted)
			});

		Promise.all([
			update(),
			backup(),
			deleted.length > 0 ? del() : null
		]).then(res => {
			const arr = res.filter(o => o && o.status == 200);
			arr.length < 2
				? alert("Error - please try later")
				: alert("Saved!");
		});

		setDeleted([]);
		setBackup({ data });

		redraw(values, csv);
	};

	const clearClick = e => {
		e.preventDefault();
		const newCsv = clear(csv);
		const newIds = newCsv.map(o => o._id);
		const newDeleted = csv.filter(o => !newIds.includes(o._id));
		const update = () =>
			fetch("/update", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newCsv)
			});
		const backup = () =>
			fetch("/backup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(backup.csv)
			});

		const del = () =>
			fetch("/delete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(deleted)
			});

		const getData = async () => {
			const res = await fetch("/api");
			const json = await res.json();
			return json;
		};

		Promise.all([
			update(),
			backup(),
			deleted.length > 0 ? del() : null
		]).then(res => {
			const arr = res.filter(o => o && o.status == 200);
			if (arr.length < 2) {
				alert("Error - try again later");
			} else {
				//untested
				getData().then(res => {
					setData(res)
				})
			}
		});
	};

	return (
		<Fragment>
			<Chart data={data} />
			<div style={{ position: "fixed" }}>
				<Button id="save" color="blue" handleClick={saveClick}>
					Save
				</Button>
				<Button id="clear" color="red" handleClick={null}>
					Clear
				</Button>
			</div>
			<Grid
				data={data}
				handleEditClick={editClick}
				handlePreviewClick={previewClick}
				handleTextChange={textChange}
				handleCompleteChange={completeChange}
				handleDeleteClick={deleteClick}
				handleAddObjectiveClick={addObjectiveClick}
				handleAddClick={addClick}
				handleSaveClick={saveClick}
			/>
		</Fragment>
	);
}

Edit.getInitialProps = async ({ req }) => {
	const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
	const res = await fetch(baseUrl + "/api");
	const json = await res.json();
	return { data: json };
};

export default Edit;
