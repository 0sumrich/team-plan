import React, { useEffect, useState, Fragment } from "react";
import draw from "../helper/draw";
import Popup from "./popup";
import EditForm from "./editForm";
import UpdateButtons from "./updateButtons";
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
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [originalObjective, setOriginalObjective] = useState(null);
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
    const filterer = o => o.objective !== editData.objective;

    if (type == "objective") {
      const tasksToDelete = tasks.filter(
        o => o.objective === editData.objective
      );
      const currObjectives = objectives.filter(filterer);
      const currTasks = tasks.filter(filterer);
      setObjectives(currObjectives);
      setTasks(currTasks);
      setObjectivesDeleteList(prev => [...prev, editData]);
      setTasksDeleteList(prev => [...prev, ...tasksToDelete]);
      setPopupEl(null);
    } else {
      const currTasks = [...tasks];
      const i = currTasks.map(o => o.id).indexOf(editData.id);
      currTasks.splice(i, 1);
      setTasks(currTasks);
      setTasksDeleteList(prev => [...prev, editData]);
      setPopupEl(null);
    }
  };

  const getUpdated = arr => arr.filter(o => o.updated === true);
  const getNew = arr => arr.filter(o => o.isNew === true);
  const clearUpdated = arr => {
    arr.forEach(el => {
      if (el.updated) {
        delete el.updated;
      }
      if (el.isNew) {
        delete el.isNew;
      }
    });
    return arr;
  };

  const initData = async () => {
    const res = await fetch(process.env.API_URL + "main");
    const data = await res.json();
    return { data };
  };

  return (
    <Fragment>
      <UpdateButtons
        handleClick={{
          both: () => {
            setObjectivesDeleteList([]);
            setTasksDeleteList([]);
            const newTasks = clearUpdated(tasks);
            const newObjectives = clearUpdated(objectives);
            setTasks(newTasks);
            setObjectives(newObjectives);
          },
          save: async () => {
            const baseUrl = process.env.API_URL;
            const updatedTasks = getUpdated(tasks);
            const newTasks = getNew(tasks);
            const deletedTasks = tasksDeleteList;
            const updatedObjectives = getUpdated(objectives);
            const newObjectives = getNew(objectives);
            const deletedObjectives = objectivesDeleteList;
            const res = await fetch(baseUrl + "save", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                updatedTasks,
                newTasks,
                deletedTasks,
                updatedObjectives,
                newObjectives,
                deletedObjectives
              })
            });
            if (res.ok) {
              alert("saved to database");
            } else {
              alert("not saved!");
            }
          }
        }}
        edit={edit}
      />
      <svg id="svg" />
      <Popup
        el={popupEl}
        data={editData}
        handleClose={() => setPopupEl(null)}
        clicks={{
          add: addClick,
          delete: deleteClick,
          edit: () => {
            setEditFormOpen(true);
            setPopupEl(null);
            setOriginalObjective(editData.objective);
          }
        }}
      />
      <EditForm
        data={editData}
        open={editFormOpen}
        handleClose={() => setEditFormOpen(false)}
        handleInputChange={{
          objective: e => {
            setEditData({
              ...editData,
              objective: e.target.value
            });
          },
          task: e => {
            setEditData({
              ...editData,
              task: e.target.value
            });
          }
        }}
        handleSubmit={{
          objective: () => {
            const i = objectives
              .map(o => o.objective)
              .indexOf(originalObjective);
            const currObjectives = [...objectives];
            currObjectives[i].objective = editData.objective;
            currObjectives[i].updated = true;
            const currTasks = [...tasks];
            currTasks.forEach(task => {
              if (task.objective === originalObjective)
                task.objective = editData.objective;
            });
            setTasks(currTasks);
            setObjectives(currObjectives);
            setEditFormOpen(false);
            setOriginalObjective(null);
          },
          task: () => {
            const currTasks = [...tasks];
            const i = currTasks.map(o => o.id).indexOf(editData.id);
            currTasks[i].task = editData.task;
            currTasks[i].complete = editData.complete;
            currTasks[i].updated = true;
            setTasks(currTasks);
            setEditFormOpen(false);
            setOriginalObjective(null);
          }
        }}
      />
    </Fragment>
  );
}

export default Chart;
