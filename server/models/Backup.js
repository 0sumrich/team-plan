const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Backup = new Schema(
	{
		text: String,
		team: String,
		objective: String,
		complete: String
	},
	{ collection: "Backup" }
);
module.exports = mongoose.model("Backup", Backup);
