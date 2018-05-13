const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
  name: String,
  isOn: Boolean,
  devices: [{type: Schema.Types.ObjectId, ref: 'Device'}]
});


const Group = mongoose.model('Group', groupSchema);

module.exports = Group;