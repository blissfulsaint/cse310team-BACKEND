const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  department: String,
  code: String,
  name: String,
  section: Number,
  capacity: Number, // Change this to the appropriate data type (e.g., Number) if capacity is not supposed to be null.
  students: [
    {
      fname: String,
      lname: String,
      profilepic: String, // Change this to the appropriate data type (e.g., String) for the image file path if needed.
    }
  ]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
