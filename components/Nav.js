import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function Nav(props) {
	const id = props.dest == "/" ? "home" : props.dest.substring(1, props.dest.length);
	const active = props.active ? true : false;
	return (
		<Link to={props.dest}>
			<Button id={id} active={active} handleClick={props.handleClick}>
				{props.children}
			</Button>
		</Link>
	);
}

export default Nav;


