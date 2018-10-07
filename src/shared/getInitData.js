import csv from "../server/models/csv";
import Value from "../server/models/Values";

/*
function getInitData() {
	return csv.find().exec()
	.then((err, doc) => {
		return doc;
	}).catch(err => console.err)
	.then(doc => {
		Value.find().exec()
		.then((err, values) => {			
			return {csv: doc, values: values}
		})
	}).catch(err => console.err)
}
*/

const csvQuery = csv.find().exec();
const ValuesQuery = Value.find().exec();

function getInitData() {
	return csvQuery.then(doc => {
		return ValuesQuery.then(values => {
			return {csv: doc, values: values};
		})
	})
}

export default getInitData;
