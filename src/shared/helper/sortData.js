import * as d3 from "d3";
import arc from './arc';
import getRings from './getRings';
import getObjectives from  './getObjectives';

export default function sortData(data){

  let pie = d3.pie().value([1]).padAngle([0.005]).sort(null);
  console.log(getRings);
  data.forEach((o, i) => {
    if(o.team[o.team.length-1]==" "){
      const str = o.team.slice(0, -1);
      o.team=str;
    }
    return o
  });  
  //const rings = data.map(o => o.team).filter((v, i, a) => a.indexOf(v) === i);
  const rings = getRings(data);
  //const objectives = pie(data.filter(o => o.team.length<1));
  const objectives = pie(getObjectives(data));
  
  const angles = objectives.map(o => {return {start: o.startAngle, end: o.endAngle}});
  //add the angles from the objectives, then flatten out the array
  let d = objectives.map((obj,index) => {
    const angle=angles[index];
    const q = data.filter(o => o.objective==obj.data.text);
    let arr = [];
    for(let i=1; i<rings.length; i++) {
      const r = q.filter(o => o.team==rings[i]);
      const ring = pie.startAngle(angle.start).endAngle(angle.end)(r);
      if(r.length>0){
        arr.push(ring);
      }      
    }
    return arr;
  }).reduce((a, b) => a.concat(b), []).reduce((a, b) => a.concat(b), []);
  //console.log(d);
  let res=[objectives];
  for(let i=1;i<rings.length;i++){
    res.push(d.filter(o => o.data.team==rings[i]));
  }
  return res;
}

