import React from "react";
import Tasks from "./Tasks";

const Objectives = ({
	objectives,
	data,
	isObjectivesList,
	handlePreviewClick,
	handleEditClick,
	handleCompleteChange,
	handleDeleteClick
}) =>
	objectives.map((o, i) => {
		const objective = o.text;
		const filtered = data.filter(k => k.data.objective == objective);
		const tasks =
			filtered.length > 0 ? (
				<Tasks
					arr={filtered}
					handleEditClick={handleEditClick}
					handlePreviewClick={handlePreviewClick}
					handleCompleteChange={handleCompleteChange}
					handleDeleteClick={handleDeleteClick}
				/>
			) : null;
		return (
			<React.Fragment key={"objective" + i}>
				<p>{objective}</p>
				{tasks}
			</React.Fragment>
		);
	});

export default Objectives;
