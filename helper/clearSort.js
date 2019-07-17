import getRings from "./getRings";
import getObjectives from "./getObjectives";

function clearSort(data) {
	const rings = getRings(data);
	const objectives = getObjectives(data);
	let d = objectives
		.map((obj, index) => {
			const q = data.filter(o => o.objective == obj.text);
			let arr = [];
			for (let i = 1; i < rings.length; i++) {
				const r = q.filter(o => o.team == rings[i]);
				if (r.length > 0) {
					arr.push(r);
				}
			}
			return arr;
		})
		.reduce((a, b) => a.concat(b), [])
		.reduce((a, b) => a.concat(b), []);

	let res = [objectives];
	
	for (let i = 1; i < rings.length; i++) {
		res.push(d.filter(o => o.team == rings[i]));
	}
	return res;
}

export default clearSort;