function consoleGroupByOption(option, cases, deaths, date) {
  console.group(`Country: ${option}`);
  console.log(`Cases: ${cases}`);
  console.log(`Deaths: ${deaths}`);
  console.log(`Date: ${date}`);
  console.groupEnd(`Country: ${option}`);
}

function reverseString(s) {
  return s.split("").reverse().join("");
}
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
function understandableDate(date) {
  let oldDate = date;
  let newDate = oldDate.slice(0, oldDate.indexOf("T"));
  let stringDate = newDate.replaceAll("-", "/");
  let dateArray = stringDate.split("/");
  let reverseDate = dateArray.reverse().join("/");

  let understandableDate = reverseDate;
  return understandableDate;
}
function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}
function mortalityRate(cases, deaths) {
  let rate = (deaths * 100) / cases;
  return roundToTwo(rate);
}
