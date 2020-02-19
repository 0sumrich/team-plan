export default (req, res) => {
	console.log(req.body)
	debugger	
	res.status(200).json({result: 'all good'});
};
