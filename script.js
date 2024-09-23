// "use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
let currency, language;

const renderCountry = function (data, className = "") {
  console.log(data.country);
  for (let key in data.currencies) {
    currency = data.currencies[key].name;
  }
  const html = `

    <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} People</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[Object.keys(data.languages)[0]]
            }</p>
            <p class="country__row"><span>💰</span>${currency}</p>
          </div> 
        </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// const getJSON = function (url, errmsg = "Something went wrong") {
//   return fetch(url).then((response) => {
//     if (!response.ok) throw new Error(`${errmsg} (${response.status})`);
//     return response.json();
//   });
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText("beforeend", msg);
// };

// const renderCountryData = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) throw new Error("There is NO neighbour!");
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         "No neighbour is found "
//       );
//     })
//     .then((data) => renderCountry(data[0], "neighbour"))
//     .catch((err) => {
//       console.log(`${err}🔴🔴`);
//       renderError(`Oppsss... ${err}. Try Again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener("click", function () {
//   renderCountryData("iran");
// });

////////////////// challenge #1

const showTextInConsole = function (data) {
  //   console.log(data);

  console.log(`You are in ${data.city}, ${data.country}🤩`);
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=348762677581265862526x8298'`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then((data) => {
      showTextInConsole(data);
      //////
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Country not found!");
      return response.json();
    })
    .then((data) => renderCountry(data[0]))
    ///////

    .catch((err) => console.log(`🖐🔴 ${err.message}`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
