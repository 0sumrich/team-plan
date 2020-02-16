import React, { useEffect, useState, Fragment } from "react";
import draw from "../helper/draw";
import Popup from "./popup";
import * as d3 from "d3";

function darker(col) {
  return d3.color(col).darker([0.5]);
}

function getNewId(arr) {
  return d3.max(arr.map(o => o.id));
}

function makeData(objectives, tasks, values) {
  return { objectives, tasks, values };
}

function Chart({ data, edit }) {
  const [editData, setEditData] = useState(null);
  const [popupEl, setPopupEl] = useState(null);
  const [objectives, setObjectives] = useState(data.objectives);
  const [tasks, setTasks] = useState(data.tasks);
  useEffect(() => {
    d3.select("svg")
      .selectAll("*")
      .remove();

    draw(makeData(objectives, tasks, data.values));

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

  const addClick = () => {
    // {id: 21, task: "Stock knowledge", team: "Pillar 4", objective: "Staff skills are enhanced", complete: "FALSE"}
    const type = editData.team == "" ? "objective" : "tasks";
    if (type == "objective") {
      setObjectives(prev => [...prev, { id: getNewId, objective: "edit me" }]);
      setPopupEl(null)
    }
  };

  return (
    <Fragment>
      <svg id="svg" />
      <Popup
        el={popupEl}
        data={editData}
        handleClose={() => setPopupEl(null)}
        clicks={{
          add: addClick
        }}
      />
    </Fragment>
  );
}

export default Chart;
