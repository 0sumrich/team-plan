import * as d3 from "d3";
import createCircles from "./createCircles";
import sortData from "./sortData";
import build from "./build";
import {
  valuesRadius,
  svgWidth,
  svgHeight,
  translateX,
  translateY,
  margin,
  scheme
} from "../constants/constants";

const YEAR = process.env.YEAR

function draw(data) {
  const { tasks, objectives, values } = data;
  const valuesCircles = createCircles(values, valuesRadius);
  let svg = d3
    .select("#svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)    
    .call(
      d3.zoom().on("zoom", function() {
        svg.attr("transform", d3.event.transform);
      })
    )
    .append("g")
    .attr("transform", "translate(" + translateX + "," + translateY + ")");

  svg
    .append("text")
    .attr("y", svgHeight / -2 + margin.top / 2 - 10)
    .attr("font-size", "1.25em")
    .attr("text-anchor", "middle")
    .text(`Libraries' Team Plan ${YEAR}`);

  //draw values circles
  let valuesG = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + valuesRadius / -1 + "," + valuesRadius / -1 + ")"
    );

  const smallCirclesRadius = 25;

  valuesG
    .append("circle")
    .attr("r", valuesRadius)
    .attr("cx", valuesRadius)
    .attr("cy", valuesRadius)
    .attr("fill", "none")
    .attr("stroke", "#e5e5e5")
    .attr("stroke-width", 8);

  valuesG
    .selectAll(".valueCirc")
    .data(valuesCircles)
    .enter()
    .append("circle")
    .attr("class", "valueCirc")
    .attr("r", smallCirclesRadius)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    //.attr('stroke', 'black')
    .attr("stroke-width", 0.5)
    .attr("fill", scheme[0]);

  valuesG
    .selectAll(".valueTxt")
    .data(valuesCircles)
    .enter()
    .append("text")
    .attr("class", "valueTxt")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .attr("font-size", "0.4em")
    .attr("id", d => d.id)
    .text(d => d.value)
    .each(function(d) {
      let text = d3.select(this),
        words = text
          .text()
          .split(" ")
          .reverse(),
        lineY = 0,
        y = d.y,
        x = d.x,
        line = [],
        word,
        lineNumber = 1,
        lineHeight = 1.1,
        w =
          2 * Math.sqrt(Math.pow(smallCirclesRadius, 2) - Math.pow(lineY, 2)) -
          7,
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", lineY + "em");
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > w) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          lineY += lineHeight;
          lineNumber++;
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", lineY + "em")
            .text(word);
        }
      }
      const height = text.node().getBBox().height - 12;
      text.attr("transform", "translate(0, " + height / 2 / -1 + " )");
    });
  const buildData = sortData(objectives, tasks);
  build(buildData, svg);
}

export default draw;
