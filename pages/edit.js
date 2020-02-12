import React, { Fragment, useState } from "react";
import fetch from "isomorphic-unfetch";
import Chart from "../components/Chart";
import Grid from "../components/Grid";
import Button from "../components/Button";
import redraw from "../helper/redraw";
import clear from "../helper/clear";
import addObjective from "../helper/addObjective";
import sortData from "../helper/sortData";

function Edit(props) {
	const [data, setData] = useState(props.data)
	const getTargetData = e => JSON.parse(e.target.dataset.task)

	return (
		<Fragment>
			<Chart data={props.data} edit/>
		</Fragment>
	);
}

Edit.getInitialProps = async ({ req }) => {
	const baseUrl = process.env.API_URL;
	const res = await fetch(baseUrl + "main");
	const data = await res.json();
	return { data };
};

export default Edit;
