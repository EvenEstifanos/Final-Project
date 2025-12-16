const express = require("express");
const StudySpace = require("../models/StudySpace");

const router = express.Router();

router.get("/", async (req, res) => {
  const spaces = await StudySpace.find().sort({ lastUpdated: -1 });
  res.render("index", { spaces });
});

router.post("/add", async (req, res) => {
  const space = new StudySpace({
    name: req.body.name,
    location: req.body.location,
    indoor: req.body.indoor === "true",
    noiseLevel: req.body.noiseLevel,
    hasOutlets: req.body.hasOutlets === "true",
    crowdLevel: "Unknown",
    lastUpdated: new Date()
  });

  await space.save();
  res.redirect("/spaces");
});

router.post("/crowd", async (req, res) => {
  await StudySpace.findByIdAndUpdate(req.body.id, {
    crowdLevel: req.body.crowdLevel,
    lastUpdated: new Date()
  });

  res.redirect("/spaces");
});

router.get("/indoor", async (req, res) => {
  const spaces = await StudySpace.find({ indoor: true });
  res.render("index", { spaces });
});

router.get("/outdoor", async (req, res) => {
  const spaces = await StudySpace.find({ indoor: false });
  res.render("index", { spaces });
});

router.get("/crowded", async (req, res) => {
  const spaces = await StudySpace.find({ crowdLevel: "Crowded" });
  res.render("index", { spaces });
});

module.exports = router;
