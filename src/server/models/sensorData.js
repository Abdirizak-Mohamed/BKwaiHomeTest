var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sensorSchema = new Schema(
  {
    name: String,
    datetime: String,
    ob_temp: Number,
    ob_battery: Number,
    channel: Number,
    sensor_model: String,
    sensor_type: String,
    offset: Number,
    value: Number,
    units: String
  },
  { collection: "sensorData" }
);

const sensor = (module.exports = mongoose.model("sensorData", sensorSchema));
