import { convertDate, createDivElement } from "./utils.js";
import { renderDailyDetails } from "./renderDailyDetails.js";

function hideWeatherDisplay() {
  document.getElementById("weather-display").style.display = "none";
}

export async function renderCurrentWeather(locationString, weather) {
  const weatherCodeMapping =
      await fetch("/scripts/weatherCodes.json").then(response => response.json());
  const { desc, icon } = weatherCodeMapping[weather.weatherCode];
  document.querySelector(".formatted-address").textContent = locationString;
  document.getElementById("weather-icon").src = icon;
  document.getElementById("weather-desc").textContent = desc;
  document.getElementById("temperature").textContent = weather.temperature;
  document.getElementById("humidity").textContent = weather.humidity + "%";
  document.getElementById("pressure").textContent = weather.pressureSeaLevel + "inHg";
  document.getElementById("wind-speed").textContent = weather.windSpeed + "mph";
  document.getElementById("visibility").textContent = weather.visibility + "mi";
  document.getElementById("cloud-cover").textContent = weather.cloudCover + "%";
  document.getElementById("uv-level").textContent = weather.uvIndex;
}

export async function renderDailyWeather(dailyWeathers) {
  const weeklyWeatherDiv = document.getElementById("weekly-weather");
  const weatherCodeMapping =
      await fetch("/scripts/weatherCodes.json").then(response => response.json());

  function createWeatherStatusColumn(dailyWeather, weatherCodeMapping) {
    const weatherDescDiv = createDivElement("weather-item weather-status", "");
    const { desc, icon } = weatherCodeMapping[dailyWeather.values.weatherCode];
    const weatherIcon = document.createElement("img");
    weatherIcon.src = icon;
    weatherIcon.alt = desc;
    weatherDescDiv.appendChild(weatherIcon);
    weatherDescDiv.appendChild(createDivElement("weather-desc", desc));
    return weatherDescDiv;
  }

  function createWeatherRow(dailyWeather) {
    const weatherRowDiv = createDivElement("weather-row", "");
    weatherRowDiv.appendChild(createDivElement("weather-item", convertDate(dailyWeather.startTime)));
    weatherRowDiv.appendChild(createWeatherStatusColumn(dailyWeather, weatherCodeMapping));
    weatherRowDiv.appendChild(createDivElement("weather-item", dailyWeather.values.temperatureMax));
    weatherRowDiv.appendChild(createDivElement("weather-item", dailyWeather.values.temperatureMin));
    weatherRowDiv.appendChild(createDivElement("weather-item", dailyWeather.values.windSpeed));
    return weatherRowDiv;
  }

  for (const dailyWeather of dailyWeathers) {
    const weatherRowDiv = createWeatherRow(dailyWeather);
    weatherRowDiv.onclick = () => {
      hideWeatherDisplay();
      renderDailyDetails(dailyWeather);
    }
    weeklyWeatherDiv.appendChild(weatherRowDiv);
  }
}