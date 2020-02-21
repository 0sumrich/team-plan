import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

function AddButton({ data }) {
	const classes = useStyles();

	return (
		<Button
			variant="outlined"
			className={classes.button}
			startIcon={<AddIcon />}
			onClick={() => console.log("add")}
		>
			Add
		</Button>
	);
}

export default AddButton;

// <Button
//         variant="contained"
//         color="secondary"
//         className={classes.button}
//         startIcon={<DeleteIcon />}
//       >
//         Delete
//       </Button>
