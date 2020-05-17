const express = require("express");
const router = express.Router();
const Weather = require("../models/weatherData");
const handleWeatherReadingRequest = require("./weatherDataHelpers");

router.get("/:startDate/:endDate", (req, res) => {
  const { startDate, endDate } = req.params;

  Weather.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ error: "Error connecting to DB" });
    } else {
      res
        .status(200)
        .send(handleWeatherReadingRequest(data, startDate, endDate));
    }
  });
});

module.exports = router;
