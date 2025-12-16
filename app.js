require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const spaceRoutes = require("./routes/spaces");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

app.use("/spaces", spaceRoutes);

app.get("/", async (req, res) => {
  let weather = null;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=College Park&units=imperial&appid=${process.env.WEATHER_KEY}`
    );
    weather = response.data;
  } catch (err) {}

  res.redirect("/spaces");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
