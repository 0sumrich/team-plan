import React from "react";
import Button from "./Button";

function AddButton(props) {
	const { objective, team, id, handleClick } = props;

	function addClick(e) {
		handleClick(team, objective);
	}

	return (
		<Button
			id={id}
			bg={["#008000", "#008700"]}
			color="white"
			border="white"
			handleClick={addClick}
			form
		>
			Add
		</Button>
	);
}

export default AddButton;
