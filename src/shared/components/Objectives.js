import React from "react";
import Tasks from "./Tasks";
import Task from './Task';

const Objectives = ({
	objectives,
	data,
	isObjectivesList,
	handlePreviewClick,
	handleEditClick,
	handleCompleteChange,
	handleDeleteClick,
	handleTextChange
}) =>
	objectives.map((o, i) => {
		const objective = o.text;
		const filtered = data.filter(k => k.data.objective == objective);
		if (isObjectivesList) {
			return (
			<React.Fragment key={"task" + i}>
				<div>
					<Task
						task={data[i]}
						handleEditClick={handleEditClick}
						handlePreviewClick={handlePreviewClick}
						handleCompleteChange={handleCompleteChange}
						handleDeleteClick={handleDeleteClick}
						handleTextChange={handleTextChange}
					/>
				</div>
				<style jsx>{`
					div {
						display: grid;
						grid-template-columns: 1fr 1fr;
					}
				`}</style>
			</React.Fragment>
			);
		} else {
			return (
				<React.Fragment key={"objective" + i}>
					<p>{objective}</p>
					<Tasks
						arr={filtered}
						handleEditClick={handleEditClick}
						handlePreviewClick={handlePreviewClick}
						handleCompleteChange={handleCompleteChange}
						handleDeleteClick={handleDeleteClick}
						handleTextChange={handleTextChange}
					/>
				</React.Fragment>
			);
		}
	});

export default Objectives;

/*
	task,
	handleEditClick,
	handlePreviewClick,
	handleCompleteChange,
	handleDeleteClick
	*/
