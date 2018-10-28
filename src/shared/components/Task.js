import React from "react";
import Button from "./Button";
import EditBar from "./EditBar";

const Task = ({ task, handleEditClick, handleUpdateClick }) => {
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
		<EditBar task={task} handleUpdateClick={handleUpdateClick} />
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

export default Task;
