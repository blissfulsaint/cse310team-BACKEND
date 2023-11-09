const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  username: String,
  password: String,
  classlist: [
      String
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
