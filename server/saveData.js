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

async function insertTasks(arr, db) {
	const sql = `
		INSERT INTO tasks (task, team, objective, complete)
		VALUES ($task, $team, $objective, $complete)
	`;
	for (let i = 0; i < arr.length; i++) {
		const taskO = arr[i];
		try {
			const { task, team, objective, complete } = taskO;
			const teamId = await db.all(
				`select id from teams where team=$team`,
				[team]
			);
			const objId = await db.all(
				`select id from objectives where objective=$objective`,
				[objective]
			);
			const params = [task, teamId[0].id, objId[0].id, complete];
			const row = await db.run(sql, params);
		} catch (e) {
			console.e;
			continue;
		}
	}
	return db;
}

async function deleteTasks(arr, db) {
	const sql = `
	DELETE FROM tasks WHERE id=$id
	`;
	for (let i = 0; i < arr.length; i++) {
		const taskO = arr[i];
		try {
			const { id } = taskO;
			const params = [id];
			const row = await db.run(sql, params);
		} catch (e) {
			console.e;
			continue;
		}
	}
	return db;
}

async function updateObjectives(arr, db) {
	const sql = `
	UPDATE objectives
		SET objective = $objective		
		where id=$id
	`;
	for (let i = 0; i < arr.length; i++) {
		const taskO = arr[i];
		try {
			const { id, objective } = taskO;
			const params = [objective, id];
			const row = await db.run(sql, params);
		} catch (e) {
			console.e;
			continue;
		}
	}
	return db;
}

async function deleteObjectives(arr, db) {
	const sql = `
	DELETE from objectives
	where objective=$objective
	`;
	for (let i = 0; i < arr.length; i++) {
		const taskO = arr[i];
		try {
			const { objective } = taskO;
			const params = [objective];
			const row = await db.run(sql, params);
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
	// const db = await Database.open(path.join(__dirname, '..', './.data/main.db'))
	const taskKeys = ["id", "task", "team", "objective", "complete"];
	if (updatedTasks.length > 0) {
		await updateTasks(updatedTasks, db);
	}
	if (newTasks.length > 0) {
		await insertTasks(newTasks, db);
	}
	if (deletedTasks.length > 0) {
		await deleteTasks(deletedTasks, db);
	}
	if (updatedObjectives.length > 0) {
		await updateObjectives(updatedObjectives, db);
	}
	if (deletedObjectives.length > 0) {
		await deleteObjectives(deletedObjectives, db);
	}
	return db;
}

module.exports = saveData;
