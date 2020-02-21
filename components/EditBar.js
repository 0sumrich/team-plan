import React from "react";
import Button from "./Button";
import PreviewButton from "./PreviewButton";
import DeleteButton from "./DeleteButton";
import Radio from "./Radio";
import Complete from "./complete";
import toBool from "../helper/toBool";

function EditBar(props) {
	const {
		task,
		handlePreviewClick,
		handleCompleteChange,
		handleDeleteClick
	} = props;

	return (
		<div className="valign-wrapper edit-bar">
			<Complete
				complete={toBool(task.data.complete)}
				id={task.data._id}
				handleCompleteChange={handleCompleteChange}
			/>
			<DeleteButton
				id={task.data._id}
				handleClick={handleDeleteClick}
			/>
			<PreviewButton
				id={task.data._id}
				handleClick={handlePreviewClick}
			/>
			<style jsx>{`
				.edit-bar {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
				}
			`}</style>
		</div>
	);
}

export default EditBar;
