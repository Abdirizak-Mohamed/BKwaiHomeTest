const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensorData");
const transformData = require("./dataHelpers");

router.get("/:sensorID/:sensorTypes", (req, res) => {
  const { sensorID } = req.params;
  console.log(sensorID);

  Sensor.find(
    { name: sensorID, sensor_type: { $in: ["tilt_x", "tilt_y", "tilt_z"] } },
    (err, data) => {
      if (err) {
        res.status(500).send({ error: "Error connecting to DB" });
      } else {
        res.status(200).send(transformData(data));
      }
    }
  );
});

module.exports = router;
