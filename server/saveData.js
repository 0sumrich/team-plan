const Database = require("sqlite-async");

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
	return null;
}

module.exports = getInitData;
