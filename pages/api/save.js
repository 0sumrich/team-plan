import saveData from "../../server/saveData";

export default (req, res) => {	
	res.status(200).json({result: req.body});
};
