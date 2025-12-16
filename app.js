require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const quizRoutes = require("./routes/quiz");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

app.use("/", quizRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Logo Quiz running on port " + PORT);
});
