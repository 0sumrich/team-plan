import React, { useEffect, useState, Fragment } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

function darker(col) {
  return d3.color(col).darker([0.5]);
}

function Chart({ data, edit }) {
  useEffect(() => {
    draw(data);
    if (edit) {
      d3.selectAll('g[class^="arc"]')
        .style("cursor", "pointer")
        .on("mouseover", function() {
          const e = d3.select(this.firstElementChild);
          const color = d3.rgb(e.style("fill"));
          e.style(
            "fill",
            d3
              .color(color)
              .darker([1])
              .rgb()
          );
        })
        .on("mouseout", function() {
          const e = d3.select(this.firstElementChild);
          const color = d3.rgb(e.style("fill"));
          e.style(
            "fill",
            d3
              .color(color)
              .brighter([1])
              .rgb()
          );
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
  );
}

export default Chart;
