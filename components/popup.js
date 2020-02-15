import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import PopupBtns from './popupBtns'

const useStyles = makeStyles(theme => ({
	typography: {
		padding: theme.spacing(2)
	}
}));

export default function Popup({ el, data, handleClose }) {
	console.log(data)
	const classes = useStyles();
	const open = Boolean(el);
	const id = open ? "simple-popover" : undefined;

	return (
		<Popover
			id={id}
			open={open}
			anchorEl={el}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
		>
			<PopupBtns />
		</Popover>
	);
}
