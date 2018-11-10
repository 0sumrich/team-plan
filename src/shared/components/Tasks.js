import React from "react";
import Task from "./Task";

const Tasks = ({
	arr,
	handleChange,
	handleEditClick,
	handlePreviewClick,
	handleCompleteChange,
	handleTextChange,
	handleDeleteClick
}) =>
	arr.map((task, i) => {
		return (
			<React.Fragment key={"task" + i}>
				<div>
					<Task
						task={task}
						handleEditClick={handleEditClick}
						handlePreviewClick={handlePreviewClick}
						handleCompleteChange={handleCompleteChange}
						handleTextChange={handleTextChange}
						handleDeleteClick={handleDeleteClick}
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
	});

export default Tasks;

