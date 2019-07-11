// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// const Value = new Schema({
//   text: String
// });

// export default IS_BROWSER ? mongoose.Document({}, Value) : mongoose.model('Value', Value);

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Value = new Schema({
	text: String
})

module.exports = mongoose.model('Value', Value)
