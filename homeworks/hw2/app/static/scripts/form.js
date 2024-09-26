import { fetchData } from "./fetchData.js";

function getFormItems() {
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const autoDetect = document.getElementById('auto-detect').checked;
  return { street, city, state, autoDetect };
}

export function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("Form submitted");

  const { street, city, state, autoDetect } = getFormItems();

  console.log('Street:', street);
  console.log('City:', city);
  console.log('State:', state);
  console.log('Auto-detect:', autoDetect);

  const weatherDisplay = document.getElementById("weather-display");
  weatherDisplay.style.display = "block";

  fetchData(street, city, state, autoDetect)
    .then(({ locationString, weather }) => {
      console.log('Location:', locationString);
      console.log('Weather:', weather);
    })
    .catch(error => {
      console.error(error);
      weatherDisplay.innerHTML = "No records have been found.";
    });
}

export function clearForm() {
  document.getElementById('street').value = '';
  document.getElementById('city').value = '';
  document.getElementById('state').value = '';
  document.getElementById('auto-detect').checked = false;
  toggleAutoDetect();
}

export function toggleAutoDetect() {
  const isAutoDetect = document.getElementById('auto-detect').checked;
  const street = document.getElementById('street');
  const city = document.getElementById('city');
  const state = document.getElementById('state');

  street.disabled = isAutoDetect;
  city.disabled = isAutoDetect;
  state.disabled = isAutoDetect;
}

