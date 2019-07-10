import clearSort from "./clearSort";

function clear(data) {
	let d = clearSort(data);
	const objectives = d[0].map(d => d.text);
	const objText = i => `Objective ${i + 1}`;
	d[0].forEach((o, i) => (o.text = objText(i)));
	let res = [];
	for (let i = 1; i < d.length; i++) {
		let r = [];
		const arr = d[i];
		for (let j = 0; j < arr.length; j++) {
			const obj = arr[j];
			if (r.length < 1) {
				r.push(obj);
			} else {
				const checkObjs = r.map(o => o.objective);
				const currObj = obj.objective;
				if (!checkObjs.includes(currObj)) {
					r.push(obj);
				}
			}
		}
		res.push(r);
	}
	let finalRes = [];
	for (let x = 0; x < res.length; x++) {
		let arr = res[x];
		for (let y = 0; y < arr.length; y++) {
			let obj = arr[y];
			obj.text = "";
			obj.complete = "FALSE";
			const txt = obj.objective;
			obj.objective = objText(objectives.indexOf(txt));
			finalRes.push(obj);
		}
	}
	return [...d[0], ...finalRes];
}

export default clear;
