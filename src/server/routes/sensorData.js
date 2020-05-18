const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensorData");
const {
  handleSensorReadingRequest,
  createAlerts,
  transformData
} = require("./dataHelpers");

router.get("/:sensorID/:startDate/:endDate", (req, res) => {
  const { sensorID, startDate, endDate } = req.params;
  console.log(sensorID);

  Sensor.find(
    { name: sensorID, sensor_type: { $in: ["tilt_x", "tilt_y", "tilt_z"] } },
    (err, data) => {
      if (err) {
        res.status(500).send({ error: "Error connecting to DB" });
      } else {
        res
          .status(200)
          .send(handleSensorReadingRequest(data, startDate, endDate));
      }
    }
  );
});

router.get("/alerts/:sensorID", (req, res) => {
  const { sensorID } = req.params;
  Sensor.find({ name: sensorID }, (err, data) => {
    if (err) {
      res.status(500).send({ error: "Error connecting to DB" });
    } else {
      res.status(200).send(createAlerts(data, sensorID));
    }
  });
});

module.exports = router;
