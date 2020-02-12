import React, { useEffect, useState, Fragment } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

function Chart({ data, edit }) {
  useEffect(() => {
    draw(data);
    if (edit) {
      d3.selectAll('g[class^="arc"]')
        .style("cursor", "pointer")
        .on('mouseover', function(){
        d3.select(this).style('fill', 'red')
      })
        .on("click", e => {
          debugger;
        });
    }
  });
  return (
    <Fragment>
      <svg id="svg"></svg>
    </Fragment>
    )
}

export default Chart;
