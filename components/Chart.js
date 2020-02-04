import React, { useEffect, useContext } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

function Chart({data}){
	useEffect(() => {
		draw(data);
	})
	return <svg id="svg"></svg>
}


export default Chart;
