import * as d3 from 'd3';
import getRadii from './getRadii';
import getTeams from './getTeams';
import chop from './chop';
import {
  radius, 
  innerMost,
  scheme,
  height,
  width,
  margin
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
      const complete = toBool(d.data.complete);
      const color = d3.color(scheme[i+1]);
      if(complete) {
        color.opacity = 0.25;
      }
      return color + "";
    })
    
    
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
    //legend
  let teams = getTeams(d);
  teams.splice(0, 0, "Library Service Values");
  let legendY = d3.scaleLinear().domain([0, teams.length]).range([5, 0.3*height])
  const legXPos = width/2;
  const legYPos = 0-(height/2)+margin.top/3;
  let legend = svg
  .append('g')
  .attr("transform", "translate(" + legXPos + "," + legYPos + ")");
  
  legend
    .selectAll(".circ")
    .data(teams)
    .enter()
    .append("circle")
    .attr("class", ".circ")
    .attr('cx', margin.left)
    .attr('cy', (t, i) => legendY(i))
    .attr('r', 4)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.25)
    .style("fill", (t, i) => scheme[i]);

  legend
    .selectAll('.legendText')
    .data(teams)
    .enter()
    .append('text')
    .attr('class', '.legendText')
    .attr('x', margin.left+8)
    .attr('y', (t, i) => legendY(i)+0.5)
    //.attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', '0.4em')
    .attr('fill', 'black')
    .text(t => t);
  
  //other lines 
  //NOT NEEDED FOR NOW
  /*
  svg.append('line')
  .attr('x1', 0)
  .attr('y1', radii[0].inner)
  .attr('x2', 0)
  .attr('y2', radius+1)
  .attr('stroke', 'black');
  
  svg.append('line')
  .attr('x1', 0)
  .attr('y1', 0-radii[0].inner)
  .attr('x2', 0)
  .attr('y2', 0-radius-1)
  .attr('stroke', 'black');
  
  svg.append('line')
  .attr('x1', radii[0].inner)
  .attr('y1', 0)
  .attr('x2', radius+1)
  .attr('y2', 0)
  .attr('stroke', 'black');
  
   svg.append('line')
  .attr('x1', 0-radii[0].inner)
  .attr('y1', 0)
  .attr('x2', 0-radius)
  .attr('y2', 0)
  .attr('stroke', 'black');
  */
}