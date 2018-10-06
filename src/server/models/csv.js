//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/*
new Schema({ url: String, text: String, id: Number}, 
           { collection : 'question' });*/
//text, team objective complete

const csv = new Schema({
  text: String,
  team: String,
  objective: String,
  complete: String
}, {collection: 'csv'});

export default mongoose.model('csv', csv);