const mongoose = require("mongoose");

const schema = {
  ordinal: "number",
  longitude: "number",
  latitude: "number",
};

module.exports = mongoose.model("location", new mongoose.Schema(schema));
