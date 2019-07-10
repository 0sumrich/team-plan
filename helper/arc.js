import * as d3 from "d3";

export default function arc(r, i){  
  return d3.arc()
    .innerRadius(r[i].inner)
    .outerRadius(r[i].outer)
    .cornerRadius([2])
}