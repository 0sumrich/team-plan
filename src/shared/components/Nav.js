import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function Nav(props) {
	const id = !props.dest=='/' ? props.dest.substring(1, props.dest.length) : 'home';
	return (
		<Link to={props.dest}>
			<Button id={id}>{props.children}</Button>
		</Link>
	);
}

export default Nav;
