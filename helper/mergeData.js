function mergeData(objectives, tasks) {
	let nextId = Math.max(...tasks.map(o => o.id)) + 1;
	let res = [...tasks];
	for (let i = 0; i < objectives.length; i++) {
		const o = {
			id: nextId,
			task: "",
			team: "",
			objective: objectives[i].objective,
			complete: "FALSE"
		};
		res.push(o);
		nextId++;
	}
	return res;
}

export default mergeData;
