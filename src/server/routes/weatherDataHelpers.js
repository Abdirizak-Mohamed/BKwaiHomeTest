const moment = require("moment");

function handleWeatherReadingRequest(data, startDate, endDate) {
  return filterByDate(data, startDate, endDate);
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

module.exports = handleWeatherReadingRequest;
