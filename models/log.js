const mongoose = require('mongoose');

const Log = mongoose.model('Log', {
  name: String,
  ip: String,
  previousState: Boolean,
  nextState: Boolean,
  creation: Number
});

module.exports = Log;