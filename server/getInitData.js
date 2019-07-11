// import csv from "../models/csv";
// import Value from "../models/Values";
//import fetch from 'node-fetch';
//import sortInitData from "./sortInitData";

const csv = require('./models/csv')
const Value = require('./models/Values')
const sortInitData = require('./helper/sortInitData')

async function getInitData() {
	const csvQuery = await csv.find().exec();
	const ValuesQuery = await Value.find().exec();
	const res = {csv: sortInitData(csvQuery), values: ValuesQuery}
	return res
}

module.exports = getInitData;
