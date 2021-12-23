async function fetchData(url_api) {
  return fetch(url_api).then(response => response.json());
}

const selectCountries = document.getElementById("countries"),
  spanConfirmed = document.querySelector(".stat--confirmed"),
  spanDeaths = document.querySelector(".stat--deaths"),
  spanDate = document.querySelector(".stat--date");

let countriesArray = [];
let slugsArray = [];

async function createCountryArray() {
  try {
    const summary = await fetchData(`https://api.covid19api.com/summary`);
    const countries = summary.Countries;
    for (let e of countries) {
      let country = e.Country;
      countriesArray.push(country);
    }
    return countriesArray;
  } catch {
    console.error(error);
  }
}
async function createSlugsArray() {
  try {
    const summary = await fetchData(`https://api.covid19api.com/summary`);
    const countries = summary.Countries;
    for (let e of countries) {
      let slug = e.Slug;
      slugsArray.push(slug);
    }
    return slugsArray;
  } catch {
    console.error(error);
  }
}
async function createCountriesOptions() {
  let countries = await createCountryArray();
  let slugs = await createSlugsArray();

  for (let i in countries) {
    let countryOption = document.createElement("option");
    countryOption.setAttribute("value", `${slugs[i]}`);
    countryOption.textContent = `${countries[i]}`;
    selectCountries.appendChild(countryOption);
  }
}

async function insertCountryStats(slug) {
  let slugSelectedIndex = slugsArray.indexOf(slug);

  const summary = await fetchData(`https://api.covid19api.com/summary`);
  const countries = summary.Countries;

  let countryInfo = countries[slugSelectedIndex];

  let confirmedCases = countryInfo.TotalConfirmed;
  let totalDeaths = countryInfo.TotalDeaths;
  let dateUpdated = countryInfo.Date;
  console.log(confirmedCases);
  console.log(totalDeaths);
  console.log(dateUpdated);

  spanConfirmed.textContent = `${fancyVisualNumber(confirmedCases)}`;
  spanDeaths.textContent = `${fancyVisualNumber(totalDeaths)}`;
  spanDate.textContent = `${understandableDate(dateUpdated)}H`;
}

selectCountries.addEventListener("change", function () {
  const optionSelected = this.options[this.options.selectedIndex];
  const slug = optionSelected.value;
  console.log(optionSelected.value);

  insertCountryStats(slug);
});

createCountriesOptions();

console.log(countriesArray);
console.log(slugsArray);

function understandableDate(date) {
  let oldDate = date;
  let pointIndex = oldDate.indexOf(".");
  let newDate = oldDate.slice(0, pointIndex);
  let array = newDate.split("T");
  let dateCompleted = `${array[0]},  ${array[1]}`;
  // console.log(pointIndex);
  // console.log(newDate);
  // console.log(array);
  // console.log(dateCompleted);
  return dateCompleted;
}

// This function is incomplete
function fancyVisualNumber(number) {
  let stringNumber = String(number);

  if (stringNumber.length >= 6) {
    let stringNumber = String(number);
    let fancyArray = stringNumber.match(/.{1,3}(.$)?/g);

    let fancyString = "";
    for (let number of fancyArray) {
      fancyString += number + " ";
      // console.log(number);
    }
    fancyString.trim();
    return fancyString;
  } else {
    return number;
  }
}
