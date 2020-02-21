import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
	label: { color: "black" }
}));

export default function Complete({ handleChange, complete }) {
	const classes = useStyles();
	const [state, setState] = React.useState(complete);
	const change = e => {		
		setState(!state);
		handleChange(!state)
	}
	return (
		<FormGroup row>
			<FormControlLabel
				className={classes.label}
				control={
					<Checkbox
						checked={state}
						onChange={change}
						value="complete"
					/>
				}
				label="Complete"
			/>
		</FormGroup>
	);
}
