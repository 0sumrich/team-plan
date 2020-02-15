import React, { useEffect, useState, Fragment } from "react";
import draw from "../helper/draw";
import Popup from "./popup";
import * as d3 from "d3";

function darker(col) {
  return d3.color(col).darker([0.5]);
}

function Chart({ data, edit }) {
  const [editData, setEditData] = useState(null);

  const [popupEl, setPopupEl] = useState(null);

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
        .on("click", function(e) {
          setPopupEl(d3.select(this).node());
          setEditData(e.data);
        });
    }
  });
  return (
    <Fragment>
      <svg id="svg" />
      <Popup
        el={popupEl}
        data={editData}
        handleClose={() => setPopupEl(null)}
      />
    </Fragment>
  );
}

export default Chart;
