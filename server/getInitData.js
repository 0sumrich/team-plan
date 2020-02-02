// import csv from "../models/csv";
// import Value from "../models/Values";
//import fetch from 'node-fetch';
//import sortInitData from "./sortInitData";

// const csv = require('./models/csv')
// const Value = require('./models/Values')
// const sortInitData = require('./helper/sortInitData')

// async function getInitData() {
// 	const csvQuery = await csv.find().exec();
// 	const ValuesQuery = await Value.find().exec();
// 	const res = {csv: sortInitData(csvQuery), values: ValuesQuery}
// 	return res
// }

const Database = require("sqlite-async")

async function getInitData() {
	const db = await Database.open('./.data/main.db');
	const data = await db.all('select * from tasks;')
	const sql = 'select * from tasks inner join teams on teams.id=tasks.team;'
	const dataJoined = await db.all('select * from tasks inner join teams on teams.id=tasks.team;')
	return dataJoined
}

module.exports = getInitData;

// const Database = require("sqlite-async");
// const moment = require("moment");
// const readSql = require("./readSql.js");
// const query = readSql("./sql/events_att_all.sql");
// const gpb = n =>
//   new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
//     n
//   );

// async function getAll() {
//   const db = await Database.open("./.data/main.db");
//   const rows = await db.all(query);
//   let res = {};
//   rows.forEach(row => {
//     const takings = row.Charge == 0 ? null : gpb(row.Charge);
//     row.Charge = takings;
//     const year = moment(row.Date).year();
//     if (res.hasOwnProperty(year)) {
//       res[year].push(row);
//     } else {
//       res[year] = [row];
//     }
//   });
//   return res;
// }

// module.exports = getAll;
