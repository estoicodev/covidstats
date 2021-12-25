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

function understandableDate(date) {
  let oldDate = date;
  let newDate = oldDate.slice(0, oldDate.indexOf("T"));
  let stringDate = newDate.replaceAll("-", "/");
  let dateArray = stringDate.split("/");
  let reverseDate = dateArray.reverse().join("/");

  let understandableDate = reverseDate;
  return understandableDate;
}
