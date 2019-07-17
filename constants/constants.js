import * as d3 from 'd3';
export const 
  margin =  {
    top: 50,
    right: 70,
    bottom: 25,
    left: 50
  },
  width = 500,
  height = 500,
  svgHeight = height+margin.top+margin.bottom,
  svgWidth = svgHeight*Math.sqrt(2),//paper ratio for printing
  radius = Math.min(width, height) / 2,
  ringWidth = 10,
  tau = 2 * Math.PI,
  scheme = d3.schemeSet3,
  innerMost = 90,
  valuesRadius = innerMost-30,
  translateX = (svgWidth/2)-margin.right, //(width/2)+margin.left;
  translateY = (height/2)+margin.top; 
