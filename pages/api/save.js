import saveData from "../../server/saveData";

export default async (req, res) => {	
	const data = await saveData(req.body);
	res.status(200).json(data);
};
