const Database = require("sqlite-async");
const path = require("path");

async function updateTasks(arr, db) {
	const taskKeys = ["id", "task", "team", "objective", "complete"];
	const sql = `
		UPDATE tasks
		SET task = $task,
		complete = $complete
		where id=$id
	`;
	for (let i = 0; i < arr.length; i++) {
		const taskO = arr[i];
		try {
			const { task, complete, id } = taskO;
			await db.run(sql, [task, complete, id]);
		} catch (e) {
			console.e;
			continue;
		}
	}
	return db;
}

async function saveData({
	updatedTasks,
	newTasks,
	deletedTasks,
	updatedObjectives,
	newObjectives,
	deletedObjectives
}) {
	const db = await Database.open("./.data/main.db");
	const taskKeys = ["id", "task", "team", "objective", "complete"];
	if (updatedTasks.length > 0) {
		const taskRes = await updateTasks(updatedTasks, db);
	}
	const tasks = await db.all("select * from tasks;");
	return {
		tasks
	};
}

module.exports = saveData;
