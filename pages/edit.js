import React, { Fragment, useState } from "react";
import fetch from "isomorphic-unfetch";
import Chart from "../components/Chart";

function Edit(props) {
	const [data, setData] = useState(props.data)

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
	const year = process.env.YEAR
	return { data, year };
};

export default Edit;
