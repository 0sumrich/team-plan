const Database = require("sqlite-async");

async function getInitData() {
	const db = await Database.open("./.data/main.db");
	const data = await db.all("select * from tasks;");
	const sql = `
		select tasks.id as id, 
		tasks.task as task,
		teams.team as team,
		objectives.objective,
		tasks.complete 
		from tasks
		inner join teams on tasks.team = teams.id
		inner join objectives on tasks.objective = objectives.id
		order by teams.id;
	`;
	const tasks = await db.all(sql);
	const objectives = await db.all("select * from objectives;");
	const values = await db.all("select * from library_values;");
	return { tasks: tasks, objectives: objectives, values: values };
}

module.exports = getInitData;
