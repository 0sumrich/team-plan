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
	const { both, save, discard } = handleClick;
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

	const saveClick = () => {
		save();
		both();
	};

	const discardClick = () => {
		discard();
		both();
	};

	return (
		<div>
			<Btn handleClick={saveClick}>Save</Btn>
			<Btn handleClick={discardClick}>Discard</Btn>
		</div>
	);
}

export default updateButtons;