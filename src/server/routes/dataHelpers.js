const moment = require("moment");

// Function Converts data from db into a format usablge by the charting library
//This fuction also filters the data to return only those values that fall between the date range specified

function handleSensorReadingRequest(data, startDate, endDate) {
  let sensorReadingsEdited = transformData(data);

  let dog = filterByDate(sensorReadingsEdited, startDate, endDate);
  return dog;
}

function transformData(data) {
  let sensorReadingsEdited = [];
  let unitDateTime = "";
  let individualUnit = {};

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].sensor_type !== "ob_temp" &&
      data[i].sensor_type !== "ob_voltage"
    ) {
      if (unitDateTime === "") {
        individualUnit[data[i].sensor_type] = data[i].value;
        individualUnit["datetime"] = data[i].datetime;
        unitDateTime = data[i].datetime;
      } else if (unitDateTime === data[i].datetime) {
        individualUnit[data[i].sensor_type] = data[i].value;

        if (i === data.length - 1) {
          sensorReadingsEdited.push(individualUnit);
        }
      } else {
        sensorReadingsEdited.push(individualUnit);
        individualUnit = {};
        individualUnit[data[i].sensor_type] = data[i].value;
        individualUnit["datetime"] = data[i].datetime;
        unitDateTime = data[i].datetime;
      }
    }
  }

  return orderDataChronologically(sensorReadingsEdited);
}

function orderDataChronologically(sensorReadingGroups) {
  let sortedReadingGroups = sensorReadingGroups.sort(function(a, b) {
    if (
      moment(a["datetime"], "DD-MM-YYYY HH:mm").isBefore(
        moment(b["datetime"], "DD-MM-YYYY HH:mm")
      )
    ) {
      return -1;
    } else if (
      moment(a["datetime"], "DD-MM-YYYY HH:mm").isAfter(
        moment(b["datetime"], "DD-MM-YYYY HH:mm")
      )
    ) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedReadingGroups;
}

function filterByDate(sensorReadingsEdited, startDate, endDate) {
  return sensorReadingsEdited.filter(date =>
    isCorrectDate(date, startDate, endDate)
  );
}

function isCorrectDate(date, startDate, endDate) {
  let isDateAfterStart = moment(date["datetime"], "DD-MM-YYYY HH:mm").isAfter(
    moment(startDate, "DD-MM-YYYY HH:mm"),
    "seconds"
  );

  let isDateBeforeEnd = moment(date["datetime"], "DD-MM-YYYY HH:mm").isBefore(
    moment(endDate, "DD-MM-YYYY HH:mm"),
    "seconds"
  );

  return isDateAfterStart && isDateBeforeEnd;
}

function createAlerts(sensorReadings, sensorID) {
  let transformedSensorReadings = transformData(sensorReadings);
  let sensorReadingsEdited = mergeDuplicateDatetimes(transformedSensorReadings);

  let prevResult = {};
  let alerts = [];

  let axes = ["tilt_x", "tilt_y", "tilt_z"];

  for (let sensorReadingGroup of sensorReadingsEdited) {
    if (!prevResult) {
      prevResult = sensorReadingGroup;
      continue;
    }

    for (let axis of axes) {
      if (prevResult[axis] && sensorReadingGroup[axis]) {
        let changeInReading = calculatePercentageChange(
          prevResult[axis],
          sensorReadingGroup[axis]
        );

        if (changeInReading > 1) {
          if (changeInReading > 3) {
            sensorReadingGroup["alertColour"] = "red";
            sensorReadingGroup["percentageChange"] = changeInReading;
            sensorReadingGroup["dangerInAxis"] = axis;
            sensorReadingGroup["name"] = sensorID;
            alerts.push(prevResult);
            alerts.push(sensorReadingGroup);
          } else {
            sensorReadingGroup["alertColour"] = "orange";
            sensorReadingGroup["percentageChange"] = changeInReading;
            sensorReadingGroup["dangerInAxis"] = axis;
            sensorReadingGroup["name"] = sensorID;
            alerts.push(sensorReadingGroup);
          }
        }
      }
    }
    prevResult = sensorReadingGroup;
  }
  console.log(alerts);
  return alerts;
}

function calculatePercentageChange(prevResult, currentResult) {
  let difference = currentResult - prevResult;
  let changeInReading = Math.abs(difference / prevResult) * 100;
  return changeInReading;
}

function mergeDuplicateDatetimes(sensorReadingsEdited) {
  let mergedReadings = [];
  for (let reading of sensorReadingsEdited) {
    if (!mergedReadings.length) {
      mergedReadings.push(reading);
    } else if (
      mergedReadings[mergedReadings.length - 1].datetime === reading.datetime
    ) {
      mergedReadings[mergedReadings.length - 1] = {
        ...mergedReadings[mergedReadings.length - 1],
        ...reading
      };
    } else {
      mergedReadings.push(reading);
    }
  }
  return mergedReadings;
}

module.exports = {
  handleSensorReadingRequest: handleSensorReadingRequest,
  createAlerts: createAlerts,
  transformData: transformData,
  filterByDate: filterByDate
};
