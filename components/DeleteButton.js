import React from "react";
import Button from "./Button";

const DeleteButton = ({ id, handleClick }) => {
	return (
		<React.Fragment>
		<Button
			id={`delete${id}`}
			handleClick={handleClick}
			color={'red'}
			form
		>
			Delete
		</Button>
		</React.Fragment>
	);
};

export default DeleteButton;
