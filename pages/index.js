import React from "react";
import Chart from "../components/Chart";
import fetch from "isomorphic-unfetch";

function Home({ data }) {
	// return <Chart data={data} />;
	return <p>hello</p>
}

Home.getInitialProps = async ({ req }) => {
	// const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
	console.log(process.env.API_URL)
	const baseUrl = process.env.API_URL + '/api/'
	const res = await fetch(baseUrl + "main");
	const json = await res.json();
	return { data: json };
};

export default Home;
