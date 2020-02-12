import React, { useEffect, useContext } from "react";
import draw from "../helper/draw";

function Chart({data}){
	useEffect(() => {
		draw(data);
	})
	return <svg id="svg"></svg>
}


export default Chart;
