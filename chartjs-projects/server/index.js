const express = require("express");
const chartsData = require("./chartsData").chartsData;
const chartjsFetchJson = require("./chartjsFetchJson").chartjsFetchJson;
const app = express();
// SET Headers to overcome CROSS Origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
// http://localhost:5000/chartsData
app.get("/chartsData", (req, res) => {
  // res.send("Hello Nithin");
  // console.log("chartsData", chartsData);
  res.json(chartsData);
});
// http://localhost:5000/chartjsFetchJson
app.get("/chartjsFetchJson", (req, res) => {
  // res.send("Hello Nithin");
  // console.log("chartsData", chartsData);
  res.json(chartjsFetchJson);
});
app.listen(5000, () => {
  console.log("running on port 5000");
});
