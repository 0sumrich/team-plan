import draw from './draw';
import * as d3 from 'd3';

export default function redraw(values, csv){
			d3
			.select("svg")
			.selectAll("*")
			.remove();
			draw(values, csv);
}