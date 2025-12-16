const express = require("express");
const axios = require("axios");
const Result = require("../models/Result");

const router = express.Router();

const companies = [
  "google.com",
  "apple.com",
  "microsoft.com",
  "amazon.com",
  "nike.com",
  "spotify.com",
  "ibm.com"
];

router.get("/", async (req, res) => {
  const domain = companies[Math.floor(Math.random() * companies.length)];

  let logoUrl = null;

  try {
    const response = await axios.get(
      `https://api.brandfetch.io/v2/brands/${domain}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BRANDFETCH_KEY}`
        }
      }
    );

    logoUrl = response.data.logos[0].formats[0].src;
  } catch (err) {
    logoUrl = "https://via.placeholder.com/300?text=Logo+Unavailable";
  }

  res.render("index", { logo: logoUrl, company: domain });
});

router.post("/guess", async (req, res) => {
  const correct =
    req.body.guess.trim().toLowerCase() ===
    req.body.company.split(".")[0].toLowerCase();

  await new Result({
    company: req.body.company,
    guess: req.body.guess,
    correct,
    createdAt: new Date()
  }).save();

  res.redirect("/");
});

module.exports = router;
