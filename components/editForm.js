import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

function EditForm({ data, open, handleClose }) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	//disablePortal
	return (
		<Modal
			disablePortal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={open}
			onClose={handleClose}
		>
			<div style={modalStyle} className={classes.paper}>
				<h2 id="simple-modal-title">Text in a modal</h2>
				<p id="simple-modal-description">
					Duis mollis, est non commodo luctdfdfasd porttitor
					ligula.
				</p>
			</div>
		</Modal>
	);
}

export default EditForm;
