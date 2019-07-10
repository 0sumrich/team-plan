import * as d3 from "d3";
import toBool from './toBool';

export default function chop(el, d, radius, color){
  let text = d3.select(el),
      parent = d3.select(text.node().parentNode),
      words = text.text().split(" "),
      line = [],
      word,
      lineNumber = 1,
      lineHeight = 1.1,
      y = parent.attr('y'),
      dy = parent.attr('dy'),
      href = text.attr('href'),
      fontSize = +text.attr('font-size').slice(0, -2),
      width = (d.endAngle-d.startAngle)*((radius.outer+radius.inner)/2),
      complete = toBool(d.data.complete);
  
  if(text.node().getComputedTextLength() > width){    
    while(text.node().getComputedTextLength() > width) {
      line.push(words.pop());
      text.text(words.join(" "))
    }
    dy=fontSize< 0.3 ? 5 : 6;
    parent.attr('dy', dy)
    lineNumber++;
    let p = d3.select(parent.node().parentNode);
    let newTextPath = p.append('text')
      .attr('x', parent.attr('x'))
      .attr('y', y)
      .attr('dy', lineNumber*dy)
      .attr('fill', complete ? color : 'black') 
      .append('textPath')
      .attr('href', href)
      .attr('font-size', text.attr('font-size'))
      .text(line.reverse().join(" "))
  }
};
