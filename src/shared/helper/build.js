import * as d3 from 'd3';
import getRadii from './getRadii';
import chop from './chop';
import {
  radius, 
  innerMost,
  scheme
} from '../constants/constants';
import {
  fontSize,
  y
} from '../constants/lets';
import arc from './arc';
import toBool from './toBool';

function darker(col){
  return d3.color(col).darker([2]) + "";
}

export default function build(d, svg){
  
  const objectives = d[0];
  const radii=getRadii(d.length, radius, innerMost);
  
  fontSize.domain([1, d.length]);
  y.domain([1, d.length]);
  
  svg
    .selectAll(".arc")
    .data(objectives)
    .enter()
    .append("g")
    .attr("class", "arc")
    .append("path")
    .attr('id', (d) => "seg" + d.data._id)
    .attr("d", arc(radii, 0))
    .style("fill", scheme[1])
    //.on("mouseover", d => console.log(d));
  
    svg.selectAll('.oText')
    .data(objectives)
    .enter()
    .append('text')
    .attr('class', 'oText')
    //.attr("x", 50) 
    .attr("dy", (radii[0].outer-radii[0].inner)/2+2)
    .attr('text-anchor', 'middle')
    .attr('id', d => "text" + d.data._id)
    .style('fill', 'black')
    .append("textPath")
    .attr('startOffset', '25%')
    .attr("href", d => "#seg"+d.data._id)
    .attr("font-size", "0.4em")
    .text(d => d.data.text);
  
  for(let i=1;i<d.length;i++){
    
    let ring=d[i];
    
    svg
    .selectAll(".arc"+i.toString())
    .data(ring)
    .enter()
    .append("g")
    .attr("class", "arc"+i.toString())
    .append("path")
    .attr('id', d => "seg" + d.data._id)
    .attr("d", arc(radii, i))
    .style("fill",(d)=> {
      //"5ba62311315a8a0f7091a896" = extend opening hours in 2 phases
      const complete = toBool(d.data.complete);
      const color = d3.color(scheme[i+1]);
      if(complete) {
        color.opacity = 0.25;
      }
      return color + "";
    })
    .on("mouseover", d => console.log(d));
    
    
    svg.selectAll('.task' + i.toString())
    .data(ring)
    .enter().append('text')
    .attr('class', 'task' + i.toString())
    .attr('id', d => "text" + d.data._id)
    .attr('x', 3)
    .attr('dy', y(i))
    .style('fill', d => {
      const complete = toBool(d.data.complete);
      if (complete) 
        return darker(scheme[i+1]);
      else
        return 'black';
    })
    .append('textPath')
    .attr('href', d => '#seg' + d.data._id)
    .attr("font-size", fontSize(i)+"em")
    .text((d, i) => {
        const res = d.data.text=="nil" ? d.data.team : d.data.text;
        return res;
    })
    .each(function(d){
        chop(this, d, radii[i], darker(scheme[i+1]));  
    })
  }
}