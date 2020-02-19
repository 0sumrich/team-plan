import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
	btn: {
		margin: theme.spacing(1)
	}
}));

function updateButtons({
	updatedTasks,
	newTasks,
	deletedTasks,
	updatedObjectives,
	newObjectives,
	deletedObjectives,
	handleClick,
	edit
}) {
	if (!edit) {
		return null;
	}
	const classes = useStyles();
	const Btn = ({ handleClick, icon, children }) => (
		<Button
			variant="outlined"
			color="primary"
			size="large"
			className={classes.btn}
			onClick={handleClick}
		>
			{children}
		</Button>
	);

	const saveClick = async () => {
		handleClick();
		const baseUrl = process.env.API_URL;
		const res = await fetch(baseUrl + "save", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				updatedTasks,
				newTasks,
				deletedTasks,
				updatedObjectives,
				newObjectives,
				deletedObjectives
			})
		});
		const data = await res.json();
		console.log(data);
	};

	// fetch("/addTask", {
	// 			method: "POST",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify(body)
	// 		});

	return (
		<div>
			<Btn handleClick={saveClick}>Save</Btn>
			<Btn handleClick={() => console.log("discard")}>Discard</Btn>
		</div>
	);
}

export default updateButtons;
