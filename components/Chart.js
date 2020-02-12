import React, { useEffect, useContext } from "react";
import draw from "../helper/draw";
import * as d3 from 'd3'

function Chart({data, edit}){
	useEffect(() => {
		draw(data);
    if(edit){
      d3.selectAll('.arc')      
    }
	})
	return <svg id="svg"></svg>
}


export default Chart;
