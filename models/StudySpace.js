const mongoose = require("mongoose");

const studySpaceSchema = new mongoose.Schema({
  name: String,
  location: String,
  indoor: Boolean,
  noiseLevel: String,
  hasOutlets: Boolean,
  crowdLevel: String,
  lastUpdated: Date
});

module.exports = mongoose.model("StudySpace", studySpaceSchema);
