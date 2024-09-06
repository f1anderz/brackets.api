const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {
    type: String,
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  nickname: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
