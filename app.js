const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const spotRoutes = require("./routes/spots");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

app.use("/spots", spotRoutes);

app.get("/", async (req, res) => {
  let weather = null;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=College Park&units=imperial&appid=${process.env.WEATHER_KEY}`
    );
    weather = response.data;
  } catch (err) {}

  res.render("index", { weather });
});

app.listen(3000);
