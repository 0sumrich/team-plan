import csv from "../server/models/csv";
import Value from "../server/models/Values";

function getInitData() {
	if(!IS_BROWSER) {
		const csvQuery = csv.find().exec();
		const ValuesQuery = Value.find().exec();
		return csvQuery.then(doc => {
			return ValuesQuery.then(values => {
				return { csv: doc, values: values };
			});
		});
	} else {
		return Promise.resolve({})
	}
}

export default getInitData;
