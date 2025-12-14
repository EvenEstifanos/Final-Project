const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model("Spot", spotSchema);
