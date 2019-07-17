import React from "react";
import Button from "./Button";

function AddButton(props) {
	const { objective, team, id, handleClick } = props;

	function addClick(e) {
		handleClick(team, objective);
	}

	return (
			<Button id={id} color="teal darken-2" handleClick={addClick} form>
				Add
			</Button>
	);
}

export default AddButton;
