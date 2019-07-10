import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Backup = new Schema({
  text: String,
  team: String,
  objective: String,
  complete: String
}, {collection: 'Backup'});

export default mongoose.model('Backup', Backup);