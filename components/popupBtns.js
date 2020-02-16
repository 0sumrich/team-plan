import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

function PopupBtns({ data, clicks }) {
	const Btn = ({ type, handleClick, children }) => {
		const classes = useStyles();
		const icon =
			type == "add" ? (
				<AddIcon />
			) : type == "edit" ? (
				<EditIcon />
			) : (
				<DeleteIcon />
			);

		return (
			<Button
				variant="outlined"
				className={classes.button}
				startIcon={icon}
				onClick={handleClick}
			>
				{children}
			</Button>
		);
	};

	return (
		<div>
			<Btn type="add" handleClick={clicks.add}>
				Add
			</Btn>
			<Btn type="edit">Edit</Btn>
			<Btn type="delete" handleClick={clicks.delete}>
				Delete
			</Btn>
		</div>
	);
}

export default PopupBtns;
