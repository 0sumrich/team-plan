import React, { useEffect, useState, Fragment } from "react";
import draw from "../helper/draw";
import * as d3 from "d3";

function darker(col) {
  return d3.color(col).darker([0.5]);
}

function Popup({data}){
  return null;
}

function Chart({ data, edit }) {
  const [editState, setEdit] = useState(null);
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
          setEdit(e.data)
        });
    }
  });
  const popup = editState ? <Popup data={editState} /> : null;
  return (
    <Fragment>
      <svg id="svg"></svg>
      {popup}
    </Fragment>
  );
}

export default Chart;
