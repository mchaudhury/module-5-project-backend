const express = require("express");
const cors = require("cors");

const {
  compliment,
  fortune,
  getWeather,
  motivationEntry,
  login,
  register
} = require("./controller.js");


const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", compliment);
app.get("/api/fortune", fortune);
app.get("/api/weather/:city", getWeather);
app.post("/api/motivation", motivationEntry);
app.post(`/api/login`, login)
app.post(`/api/register`, register)

app.listen(4000, () => console.log("Server running on 4000"));
