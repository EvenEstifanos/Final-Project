const express = require("express");
const Spot = require("../models/Spot");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.find();
  res.render("index", { spots, weather: null });
});

router.post("/add", async (req, res) => {
  const spot = new Spot({
    name: req.body.name,
    description: req.body.description
  });

  await spot.save();
  res.redirect("/spots");
});

module.exports = router;
