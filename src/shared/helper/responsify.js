import * as d3 from "d3";

function responsify(svg, width, margin) {
  let container = d3.select(svg.node().parentNode),
    h=width+margin.left+margin.right,
    w=h*Math.sqrt(2),//a3 paper dimension ratio
    aspect = w / h;
  svg
    .attr("viewBox", "0 0 " + w + " " + h)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize);

  d3.select(window).on("resize." + container.attr("id"), resize);

  function resize() {
    let max = 0.9*(window.innerWidth);
    let targetWidth =
      parseInt(container.style("width")) < max
        ? parseInt(container.style("width"))
        : max;
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
};

export default responsify;