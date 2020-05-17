var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var weatherSchema = new Schema(
  {
    time: String,
    summary: String,
    temperature: Number,
    humidity: Number,
    pressure: Number,
    windSpeed: Number,
    windGust: Number,
    windBearing: Number,
    cloudCover: Number,
    country: String,
    city: String
  },
  { collection: "weatherdata" }
);

const weather = (module.exports = mongoose.model("weatherdata", weatherSchema));
