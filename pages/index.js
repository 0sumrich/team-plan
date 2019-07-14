import React from "react";
import Chart from "../components/Chart";
import fetch from "isomorphic-unfetch";

function Home({ data }) {
	return <Chart data={data} />;
}

Home.getInitialProps = async ({ req }) => {
	const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
	const res = await fetch(baseUrl + "/api");
	const json = await res.json();
	return { data: json };
};

export default Home;
