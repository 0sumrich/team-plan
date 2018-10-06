//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/*
new Schema({ url: String, text: String, id: Number}, 
           { collection : 'question' });*/
//text, team objective complete

const Value = new Schema({
  text: String
});

export default mongoose.model('Value', Value);