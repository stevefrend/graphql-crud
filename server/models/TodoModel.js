const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  userId: String,
});

module.exports = mongoose.model('todo', todoSchema);
