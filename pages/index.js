import React from "react";
import Chart from "../components/Chart";
import fetch from "isomorphic-unfetch";

function Home({ data }) {
	// return <Chart data={data} />;
	console.log(data)
	return <p>hello</p>;
}

Home.getInitialProps = async ({ req }) => {
	const baseUrl = process.env.API_URL;
	const res = await fetch(baseUrl + "main");
	const data = await res.json();
	return {data}
};

export default Home;
