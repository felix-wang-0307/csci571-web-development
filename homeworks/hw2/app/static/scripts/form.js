import { fetchData } from "./fetchData.js";
import { renderCurrentWeather, renderWeeklyWeather } from "./renderWeeklyWeather.js";
import { renderCharts } from "./renderCharts.js";

function getFormItems() {
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const autoDetect = document.getElementById('auto-detect').checked;
  return { street, city, state, autoDetect };
}

export async function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const { street, city, state, autoDetect } = getFormItems();
  const weatherDisplayDiv = document.getElementById("weather-display");
  try {
    const { locationString = "", weather = {} } =
        await fetchData(street, city, state, autoDetect);
    const currentWeather = weather.timelines
        ?.find(timeline => timeline.timestep === "current")
        ?.intervals[0]
        ?.values;
    await renderCurrentWeather(locationString, currentWeather);
    const weeklyWeather = weather.timelines
        ?.find(timeline => timeline.timestep === "1d")
        ?.intervals;
    await renderWeeklyWeather(weeklyWeather);
    const hourlyWeather = weather.timelines
        ?.find(timeline => timeline.timestep === "1h")
        ?.intervals;
    document.addEventListener("dailyWeatherSelected", () => {
      console.log("Daily weather selected");
      renderCharts(weeklyWeather, hourlyWeather);
    });
  } catch (error) {
    console.error(error);
    const currentWeatherDiv = document.getElementById("current-weather");
    currentWeatherDiv.innerHTML = "No records have been found.";
  } finally {
    weatherDisplayDiv.style.display = "flex";  // Show the weather display anyway
  }
}

export function clearForm(event) {
  event.preventDefault();  // Prevent the default form submission behavior
  document.getElementById('street').value = '';
  document.getElementById('city').value = '';
  document.getElementById('state').value = '';
  document.getElementById('auto-detect').checked = false;
  document.getElementById("weather-display").style.display = "none";  // Hide the weather display
  document.getElementById("daily-weather").style.display = "none";
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
