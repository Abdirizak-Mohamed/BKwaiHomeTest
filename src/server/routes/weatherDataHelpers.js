const moment = require("moment");

function handleWeatherReadingRequest(data, startDate, endDate) {
  let filteredReadings = filterByDate(data, startDate, endDate);

  return orderDataChronologically(filteredReadings);
}

function filterByDate(weatherData, startDate, endDate) {
  return weatherData.filter(date => isCorrectDate(date, startDate, endDate));
}

function isCorrectDate(date, startDate, endDate) {
  let isDateAfterStart = moment(date["time"], "DD-MM-YYYY HH:mm:ss").isAfter(
    moment(startDate, "DD-MM-YYYY HH:mm:ss"),
    "seconds"
  );

  let isDateBeforeEnd = moment(date["time"], "DD-MM-YYYY HH:mm:ss").isBefore(
    moment(endDate, "DD-MM-YYYY HH:mm:ss"),
    "seconds"
  );

  return isDateAfterStart && isDateBeforeEnd;
}

function orderDataChronologically(sensorReadingGroups) {
  let sortedReadingGroups = sensorReadingGroups.sort(function(a, b) {
    if (
      moment(a["time"], "DD-MM-YYYY HH:mm").isBefore(
        moment(b["time"], "DD-MM-YYYY HH:mm")
      )
    ) {
      return -1;
    } else if (
      moment(a["time"], "DD-MM-YYYY HH:mm").isAfter(
        moment(b["time"], "DD-MM-YYYY HH:mm")
      )
    ) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedReadingGroups;
}

module.exports = handleWeatherReadingRequest;
