import React, { Component } from "react";
import getObjectives from "../helper/getObjectives";
import getRings from "../helper/getRings";
import sortData from "../helper/sortData";
import Button from "./Button";

const Title = ({ children, i }) => {
	return (
		<React.Fragment>
			<p>
				<strong>{children}</strong>
			</p>
			<style jsx>{`
				p {
					font-family: inherit;
					display: block;
					font-size: 1.25em;
				}
			`}</style>
		</React.Fragment>
	);
};
const Task = ({ task, handleEditClick, handleChangeClick }) => {
	const edit = task.data.edit;
	const res = edit ? (
		<input
			type="text"
			className="task"
			id={`input${task.data._id}`}
			defaultValue={task.data.text}
		/>
	) : (
		<p style={{ fontSize: "0.75em" }}>{task.data.text}</p>
	);
	const button = edit ? (
		<Button
			id={`button${task.data._id}`}
			handleClick={handleChangeClick}
			form
		>
			Update
		</Button>
	) : (
		<Button
			id={`button${task.data._id}`}
			handleClick={handleEditClick}
			form
		>
			Edit
		</Button>
	);

	return (
		<React.Fragment>
			{res}
			{button}
			<style jsx>{`
				div {
					display: grid;
					grid-template-columns: 2fr 1fr;
				}
				input {
					font-family: inherit;
					display: block;
					width: 80%;
					padding: 10px 5px;
					border-radius: 5px;
					margin: 5px 0px;
				}
			`}</style>
		</React.Fragment>
	);
};

const Tasks = ({ arr, handleChange, handleEditClick , handleChangeClick}) =>
	arr.map((task, i) => {
		return (
			<React.Fragment key={"task" + i}>
				<div>
					<Task task={task} handleEditClick={handleEditClick} handleChangeClick={handleChangeClick}/>
				</div>
				<style jsx>{`
					div {
						display: grid;
						grid-template-columns: 1fr 1fr;
					}
				`}</style>
			</React.Fragment>
		);
	});

const Objectives = ({
	objectives,
	data,
	isObjectivesList,
	handleChangeClick,
	handleEditClick
}) =>
	objectives.map((o, i) => {
		const objective = o.text;
		const filtered = data.filter(k => k.data.objective == objective);
		const tasks =
			filtered.length > 0 ? (
				<Tasks arr={filtered} handleEditClick={handleEditClick} handleChangeClick={handleChangeClick}/>
			) : null;
		return (
			<React.Fragment key={"objective" + i}>
				<p>{objective}</p>
				{tasks}
			</React.Fragment>
		);
	});

function Grid(props) {
	const { data, handleEditClick, handleChangeClick } = props;
	const csv = sortData(data.csv);
	const values = data.values;
	const rings = getRings(data.csv);
	rings[0] = "Objectives";
	const objectives = getObjectives(data.csv);
	//<Objectives objectives={objectives} data={csv} />
	return (
		<React.Fragment>
			<form>
				{rings.map((ring, i) => {
					return (
						<React.Fragment key={"frag" + i}>
							<Title key={"ring" + i}>{ring}</Title>
							<Objectives
								objectives={objectives}
								data={csv[i]}
								isObjectivesList={i == 0 ? true : false}
								handleEditClick={handleEditClick}
								handleChangeClick={handleChangeClick}
							/>
						</React.Fragment>
					);
				})}
			</form>
			<style jsx>{`
				form {
					width: 100%;
					margin: 5px;
				}
			`}</style>
		</React.Fragment>
	);
}

//ring title, list, edit button, complete ? button

export default Grid;
