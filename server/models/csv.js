const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const csv = new Schema({
  text: String,
  team: String,
  objective: String,
  complete: String
}, {collection: 'csv'});

module.exports = mongoose.model('csv', csv);