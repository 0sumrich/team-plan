import csv from "../server/models/csv";
import Value from "../server/models/Values";

function getInitData() {
		const csvQuery = csv.find().exec();
		const ValuesQuery = Value.find().exec();
		return csvQuery.then(doc => {
			return ValuesQuery.then(values => {
				return { csv: doc, values: values };
			});
		});
}

export default getInitData;
