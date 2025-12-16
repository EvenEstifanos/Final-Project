const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  company: String,
  guess: String,
  correct: Boolean,
  createdAt: Date
});

module.exports = mongoose.model("Result", resultSchema);
