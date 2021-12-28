async function fetchData(url_api) {
  return fetch(url_api).then(response => response.json());
}

const selectCountries = document.getElementById("countries"),
  spanConfirmed = document.querySelector(".stat--confirmed"),
  spanDeaths = document.querySelector(".stat--deaths"),
  spanRate = document.querySelector(".stat--rate"),
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
  let country = countryInfo.Country;
  let confirmedCases = countryInfo.TotalConfirmed;
  let totalDeaths = countryInfo.TotalDeaths;
  let dateUpdated = countryInfo.Date;
  consoleGroupByOption(country, confirmedCases, totalDeaths, dateUpdated);

  spanConfirmed.textContent = `${fancyVisualNumber(confirmedCases)}`;
  spanDeaths.textContent = `${fancyVisualNumber(totalDeaths)}`;
  spanRate.textContent = `${mortalityRate(confirmedCases, totalDeaths)}%`;
  spanDate.textContent = `${understandableDate(dateUpdated)}`;
}

async function requestGlobalStats() {
  const summary = await fetchData(`https://api.covid19api.com/summary`);
  const global = summary.Global;

  let option = "Global";
  let confirmedCases = global.TotalConfirmed;
  let totalDeaths = global.TotalDeaths;
  let dateUpdated = global.Date;
  consoleGroupByOption(option, confirmedCases, totalDeaths, dateUpdated);

  spanConfirmed.textContent = `${fancyVisualNumber(confirmedCases)}`;
  spanDeaths.textContent = `${fancyVisualNumber(totalDeaths)}`;
  spanRate.textContent = `${mortalityRate(confirmedCases, totalDeaths)}%`;
  spanDate.textContent = `${understandableDate(dateUpdated)}`;
}

selectCountries.addEventListener("change", function () {
  const optionSelected = this.options[this.options.selectedIndex];
  if (optionSelected.value === "all-countries") {
    requestGlobalStats();
  } else {
    const slug = optionSelected.value;
    console.log(slug);
    insertCountryStats(slug);
  }
});

console.log("Countries:", countriesArray);
console.log("Slugs:", slugsArray);

requestGlobalStats();
createCountriesOptions();
