import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormGroup from '@material-ui/core/FormGroup';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Complete from "./Complete";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		"& .MuiTextField-root": {
			margin: `${theme.spacing(1)}px 0px`
		}
	},
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

// {id: 21, task: "Stock knowledge", team: "Pillar 4", objective: "Staff skills are enhanced", complete: "FALSE"}

function EditForm({
	data,
	open,
	handleClose,
	handleInputChange,
	handleSubmit
}) {
	if (!data) {
		return null;
	}
	const [currData, setCurrData] = useState(data);
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const type = data.team == "" ? "objective" : "task";
	useEffect(() => {
		if (open) {
			document.querySelector("input").focus();
		}
	});
	const toBool = s => s === 'TRUE' ? true : false;
	return (
		<Modal
			disablePortal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={open}
			onClose={handleClose}
		>
			<div style={modalStyle} className={classes.paper}>
				<form
					className={classes.root}
					noValidate
					autoComplete="off"
					onSubmit={e => {
						e.preventDefault();
						handleSubmit[type]();
					}}
				>
					{type == "objective" ? (
						<Fragment>
							<TextField
								required
								fullWidth
								id="standard-required"
								label="Objective"
								defaultValue={data.objective}
								onChange={handleInputChange.objective}
							/>							
							<Button
								variant="outlined"
								type="submit"
								className={classes.root}
							>
								Submit
							</Button>
						</Fragment>
					) : (
						<Fragment>
							<p>{`Team: ${data.team}`}</p>
							<p>{`Objective: ${data.objective}`}</p>
							<TextField
								required
								fullWidth
								id="standard-required"
								label="Task"
								defaultValue={data.task}
								onChange={handleInputChange.task}
							/>
							<Complete handleChange={handleInputChange.complete} complete={toBool(data.complete)}/>
							<Button
								variant="outlined"
								type="submit"
								className={classes.root}
							>
								Submit
							</Button>
						</Fragment>
					)}
				</form>
			</div>
		</Modal>
	);
}

export default EditForm;
