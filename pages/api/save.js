import saveData from "../../server/saveData";

export default async (req, res) => {	
	try {
		const data = await saveData(req.body);
		res.status(200).json(data);	
	} catch(e) {
		console.e
		res.status(500)
	}
	
};
