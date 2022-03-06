const express = require("express");
const cors = require("cors");
const { query } = require("./database");

const app = express();

app.use(cors());
app.get("/location", (req, res) => {
  query(res);
});

const start = (port) => {
  app.listen(port, () => {
    console.log(`Geolocation Api server listening on port ${port}...`);
  });
};

module.exports = start;
