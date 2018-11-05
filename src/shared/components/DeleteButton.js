import React from "react";
import Button from "./Button";

const DeleteButton = ({ id, handleClick }) => {
	return (
		<Button id={`delete${id}`} handleClick={handleClick} form>
			Delete
		</Button>
	);
};

export default DeleteButton;