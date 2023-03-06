const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
