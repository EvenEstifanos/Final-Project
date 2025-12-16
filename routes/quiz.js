const express = require("express");
const router = express.Router();

const logos = [
  { image: "apple.png", answer: "apple" },
  { image: "audi.png", answer: "audi" },
  { image: "chevrolet.png", answer: "chevrolet" },
  { image: "facebook.png", answer: "facebook" },
  { image: "mcdonalds.png", answer: "mcdonalds" },
  { image: "nike.png", answer: "nike" },
  { image: "pepsi.png", answer: "pepsi" },
  { image: "popeyes.png", answer: "popeyes" },
  { image: "shell.png", answer: "shell" },
  { image: "toyota.png", answer: "toyota" }
];

// shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

router.get("/", (req, res) => {
  const quiz = shuffle([...logos]); // already 10
  res.render("quiz", { quiz, score: null });
});

router.post("/submit", (req, res) => {
  let score = 0;

  logos.forEach((logo, index) => {
    const guess = req.body[`q${index}`];
    if (guess && guess.toLowerCase().trim() === logo.answer) {
      score++;
    }
  });

  res.render("quiz", { quiz: logos, score });
});

module.exports = router;