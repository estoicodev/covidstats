function understandableDate(date) {
  let oldDate = date;
  let pointIndex = oldDate.indexOf(".");
  let newDate = oldDate.slice(0, pointIndex);
  let array = newDate.split("T");
  let stringDate = array[0].replaceAll("-", "/");
  let stringTime = array[1];
  stringTime = timeConvert(stringTime);

  let understandableDate = `${stringDate}, ${stringTime}`;
  return understandableDate;
}

// This function is complete
function fancyVisualNumber(number) {
  let stringNumber = String(number);
  let reverseNumber = reverseString(stringNumber);

  if (stringNumber.length >= 6) {
    let fancyArray = reverseNumber.match(/.{1,3}/g);
    let fancyString = "";
    for (let number of fancyArray) {
      fancyString += number + " ";
    }
    fancyString.trim();
    let stringCompleted = reverseString(fancyString);

    return stringCompleted;
  } else {
    return number;
  }
}
function reverseString(s) {
  return s.split("").reverse().join("");
}
function timeConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[3] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}
