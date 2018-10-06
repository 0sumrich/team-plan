import * as d3 from 'd3';
import {scheme} from './constants';
let c = d3.scaleOrdinal().range(scheme);
let x = d3.scaleLinear().range([0, 1]);
let fontSize = d3.scaleLinear().range([0.25, 0.4]);
let y = d3.scaleLinear().range([5,9]);
let pie = d3.pie().value([1]).padAngle([0.005]).sort(null);

export {c, x, fontSize, y, pie};

