const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 80;
const staticpath = path.join(__dirname, "/");

var antares = require("antares-http");

app.use(express.static(staticpath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(staticpath + "/index.html");
});

app.get("/api", function (req, res) {
  antares.setAccessKey("3b71941b4e3ba492:e952e7b073875cb5");
  antares.get("smart-plant-temprature-control", "sensor1").then(function (response) {
    const data = response.content;
    res.json(data);
  });
});

app.post("/api", function (req, res) {
  const { parcel } = req.body;
  // console.log(parcel);
  if (!parcel) {
    return res.status(400).send({ status: "failed" });
  }
  res.status(200).send({ status: "recieved" });
  antares.send(parcel, "smart-plant-temprature-control", "sensor1")
  .then(function(response){
    // console.log(response);
  })
});

app.listen(port);
