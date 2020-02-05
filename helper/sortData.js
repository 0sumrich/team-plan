import * as d3 from "d3";
import arc from "./arc";
import getRings from "./getRings";
import getObjectives from "./getObjectives";

// objective
// id: 0
// objective: "Staff skills are enhanced"

// task
// id: 0
// task: ""
// team: "Pillar 0"
// objective: "Maximum use made of resources"
// complete: "FALSE"

function mergeData(objectives, tasks) {
  let nextId = Math.max(...tasks.map(o => o.id)) + 1;
  let res = [...tasks];
  for (let i = 0; i < objectives.length; i++) {
    const o = {
      id: nextId,
      task: "",
      team: "",
      objective: objectives[i].objective,
      complete: "FALSE"
    };
    res.push(o);
    nextId++;
  }
  return res;
}

export default function sortData(inObjectives, tasks) {
  const data = mergeData(inObjectives, tasks);

  let pie = d3
    .pie()
    .value([1])
    .padAngle([0.005])
    .sort(null);

  data.forEach((o, i) => {
    if (o.team[o.team.length - 1] == " ") {
      const str = o.team.slice(0, -1);
      o.team = str;
    }
    return o;
  });

  const rings = getRings(data).filter(x => x!="")
  rings.splice(0, 0, "")
  
  const objectives = pie(getObjectives(data));

  const angles = objectives.map(o => {
    return { start: o.startAngle, end: o.endAngle };
  });

  //add the angles from the objectives, then flatten out the array
  let d = objectives
    .map((obj, index) => {
      const angle = angles[index];
      const q = data.filter(o => o.objective == obj.data.objective);
      let arr = [];
      for (let i = 1; i < rings.length; i++) {
        const r = q.filter(o => o.team == rings[i]);
        const ring = pie.startAngle(angle.start).endAngle(angle.end)(r);
        if (r.length > 0) {
          arr.push(ring);
        }
      }
      return arr;
    })
    .reduce((a, b) => a.concat(b), [])
    .reduce((a, b) => a.concat(b), []);
  
  let res = [objectives];
  for (let i = 1; i < rings.length; i++) {
    res.push(d.filter(o => o.data.team == rings[i]));
  }

  return res;
}
