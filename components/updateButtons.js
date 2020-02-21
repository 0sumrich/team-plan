import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import UndoIcon from '@material-ui/icons/Undo';

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
			size="large"
			className={classes.btn}
			onClick={handleClick}
			startIcon={icon}
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
			<Btn handleClick={saveClick} icon={<SaveIcon />}>Save</Btn>
			<Btn handleClick={discardClick} icon={<UndoIcon />}>Undo</Btn>
		</div>
	);
}

export default updateButtons;
