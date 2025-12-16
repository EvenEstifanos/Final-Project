const express = require("express");
const Result = require("../models/Result");

const router = express.Router();

const companies = [
  { name: "Google", domain: "google.com" },
  { name: "Apple", domain: "apple.com" },
  { name: "Nike", domain: "nike.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Netflix", domain: "netflix.com" },
  { name: "Spotify", domain: "spotify.com" }
];

router.get("/", async (req, res) => {
  const random = companies[Math.floor(Math.random() * companies.length)];
  res.render("index", {
    logo: `https://logo.clearbit.com/${random.domain}`,
    company: random.name
  });
});

router.post("/guess", async (req, res) => {
  const correct =
    req.body.guess.trim().toLowerCase() ===
    req.body.company.toLowerCase();

  const result = new Result({
    company: req.body.company,
    guess: req.body.guess,
    correct: correct,
    createdAt: new Date()
  });

  await result.save();

  res.redirect("/");
});

module.exports = router;
