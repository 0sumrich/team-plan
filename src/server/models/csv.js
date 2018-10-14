import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const csv = new Schema({
  text: String,
  team: String,
  objective: String,
  complete: String
}, {collection: 'csv'});

export default IS_BROWSER ? mongoose.Document({}, csv) : mongoose.model('csv', csv);