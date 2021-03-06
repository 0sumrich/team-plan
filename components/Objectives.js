import React from "react";
import Tasks from "./Tasks";
import Task from "./Task";
import AddButton from './AddButton';

const Objectives = ({
	objectives,
	data,
	isObjectivesList,
	handlePreviewClick,
	handleEditClick,
	handleCompleteChange,
	handleDeleteClick,
	handleTextChange,
	team,
	handleAddClick
}) =>
	objectives.map((o, i) => {
		const objective = o.objective;
		const filtered = data.filter(k => k.data.objective == objective && k.data.team.length>0);

		if (isObjectivesList) {
			return (
				<React.Fragment key={"objective" + i}>
					<div>
						<Task
							task={data[i]}
							handlePreviewClick={handlePreviewClick}
							handleCompleteChange={handleCompleteChange}
							handleDeleteClick={handleDeleteClick}
							handleTextChange={handleTextChange}
							objective
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
				<React.Fragment key={"task" + i}>
					<div className="o-container valign-wrapper">
						<p>{objective}</p>
						<AddButton
							objective={objective}
							team={team}
							id={"add"+i}
							handleClick={handleAddClick}
						/>
					</div>
					<Tasks
						arr={filtered}
						handleEditClick={handleEditClick}
						handlePreviewClick={handlePreviewClick}
						handleCompleteChange={handleCompleteChange}
						handleDeleteClick={handleDeleteClick}
						handleTextChange={handleTextChange}
					/>
					<style jsx>{`
						.o-container {
							display: grid;
							grid-template-columns: 1fr 1fr;
						}
					`}</style>
				</React.Fragment>
			);
		}
	});

export default Objectives;

