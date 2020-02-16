import React, { useEffect, useState, Fragment } from "react";
import draw from "../helper/draw";
import Popup from "./popup";
import * as d3 from "d3";

function darker(col) {
  return d3.color(col).darker([0.5]);
}

function getNewId(arr) {
  return d3.max(arr.map(o => o.id)) + 1;
}

function makeData(objectives, tasks, values) {
  return { objectives, tasks, values };
}

function Chart({ data, edit }) {
  const [editData, setEditData] = useState(null);
  const [popupEl, setPopupEl] = useState(null);
  const [objectives, setObjectives] = useState(data.objectives);
  const [tasks, setTasks] = useState(data.tasks);
  const [objectivesDeleteList, setObjectivesDeleteList] = useState([]);
  const [tasksDeleteList, setTasksDeleteList] = useState([]);

  useEffect(() => {
    d3.select("svg")
      .selectAll("*")
      .remove();

    draw(makeData(objectives, tasks, data.values));
  }, [objectives, tasks]);

  useEffect(() => {
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
          console.log(d3.select(this).node());
          setPopupEl(d3.select(this).node());
          setEditData(e.data);
        });
    }
  });

  const addClick = () => {
    const type = editData.team == "" ? "objective" : "task";

    if (type == "objective") {
      setObjectives(prev => [
        ...prev,
        { id: getNewId, objective: "edit me", isNew: true }
      ]);

      const newTasks = [...new Set(tasks.map(o => o.team))].map((team, i) => ({
        id: getNewId(tasks) + i,
        task: "edit me",
        team: team,
        objective: "edit me",
        complete: "FALSE",
        isNew: true
      }));

      setTasks(prev => [...prev, ...newTasks]);

      setPopupEl(null);
    } else {
      const newTask = {
        id: getNewId(tasks),
        task: "edit me",
        team: editData.team,
        objective: editData.objective,
        complete: "FALSE",
        isNew: true
      };

      setTasks(prev => [...prev, newTask]);
      setPopupEl(null);
    }
  };

  const deleteClick = () => {
    const type = editData.team == "" ? "objective" : "task";

    if (type == "objective") {
      const filterer = o => o.objective !== editData.objective;
      const tasksToDelete = tasks.filter(o => o.objective===editData.objective)
      const currObjectives = objectives.filter(filterer);
      const currTasks = tasks.filter(filterer);
      setObjectives(currObjectives);
      setTasks(currTasks);
      setObjectivesDeleteList(prev => [...prev, editData])
      setTasksDeleteList(prev => [...prev, tasksToDelete])
      setPopupEl(null);
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
          add: addClick,
          delete: deleteClick
        }}
      />
    </Fragment>
  );
}

export default Chart;
