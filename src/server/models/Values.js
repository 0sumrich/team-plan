//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Value = new Schema({
  text: String
});

export default mongoose.model('Value', Value);