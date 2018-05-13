const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = Schema({
  name: String,
  ip: String,
  isOn: Boolean,
  group: {type: Schema.Types.ObjectId, ref: 'Group'}
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;