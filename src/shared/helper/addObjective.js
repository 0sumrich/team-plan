import getObjectives from './getObjectives';
import getRings from './getRings';

export default function addObjective(data){
  let d = data;
  const rings = getRings(d);
  const objectiveNo = getObjectives(d).length + 1;
  rings.shift();
  let res = [];
  rings.forEach(ring => {
    res.push({
      team: ring,
      text: "",
      objective: `Objective ${objectiveNo}`
    });
  })  
  const newObjective = {
    team: "",
    text: `Objective ${objectiveNo}`,
    objective: ""
  }  
  return [newObjective, ...res, ...d];
}