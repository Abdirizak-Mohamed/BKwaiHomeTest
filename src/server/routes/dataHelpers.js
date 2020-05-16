function transformData(data) {
  let transformedData = [];
  let unitDateTime = "";
  let individualUnit = {};

  for (let i = 0; i < data.length; i++) {
    if (unitDateTime === "") {
      individualUnit[data[i].sensor_type] = data[i].value;
      individualUnit["datetime"] = constructDateObject(data[i].datetime);
      unitDateTime = data[i].datetime;
      console.log("FirstTime", i, unitDateTime);
    } else if (unitDateTime === data[i].datetime) {
      individualUnit[data[i].sensor_type] = data[i].value;
      console.log("Middle", i, unitDateTime);
    } else {
      transformedData.push(individualUnit);
      console.log("Push Bitch", i, individualUnit);
      individualUnit = {};
      individualUnit[data[i].sensor_type] = data[i].value;
      individualUnit["datetime"] = constructDateObject(data[i].datetime);
      unitDateTime = data[i].datetime;
      console.log("Push Bitch 2", i, individualUnit);
    }
  }
  return transformedData;
}

function constructDateObject(stringDate) {
  let splitDate = stringDate.split(" ");
  let splitTime = splitDate[1].split(":");
  var parts = splitDate[0].split("/");
  console.log(parts);
  console.log(splitTime);
  var date = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10),
    parseInt(splitTime[0], 10),
    parseInt(splitTime[1], 10)
  );

  return date;
}

module.exports = transformData;
