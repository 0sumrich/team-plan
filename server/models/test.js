//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Test = new Schema({
  data: String
});

export default mongoose.model('Test', Test);