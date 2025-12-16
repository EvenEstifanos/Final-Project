require("dotenv").config();
const express = require("express");
const session = require("express-session");

const quizRoutes = require("./routes/quiz");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "logo-quiz-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", quizRoutes);

app.listen(3000, () => {
  console.log("Logo Quiz running on http://localhost:3000");
});
