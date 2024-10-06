import { convertDate } from "./utils.js";

export async function renderDailyDetails(dailyWeather) {
  console.log(dailyWeather);
  document.getElementById("daily-weather").style.display = "block";
  document.getElementById("daily-weather-date").textContent = convertDate(dailyWeather.startTime);
  const weatherCodeMapping = await fetch("/scripts/weatherCodes.json")
      .then(response => response.json());

  const values = dailyWeather.values;
  const { desc, icon } = weatherCodeMapping[values.weatherCode]; // Example mapping based on weatherCode
  document.getElementById("daily-weather-desc").textContent = desc;
  document.getElementById("daily-weather-icon").src = icon;
  // Set temperature values (Max/Min)
  const temperatureMax = values.temperatureMax;
  const temperatureMin = values.temperatureMin;
  document.getElementById("daily-weather-temperature").textContent = `${temperatureMax}°F / ${temperatureMin}°F`;

  // Set Precipitation
  document.getElementById("daily-precipitation").textContent = values.precipitationProbability + "%";

  // Set Chance of Rain
  document.getElementById("daily-chance-of-rain").textContent = values.precipitationProbability + "%";

  // Set Wind Speed
  document.getElementById("daily-wind-speed").textContent = values.windSpeed.toFixed(1) + " mph";

  // Set Humidity
  document.getElementById("daily-humidity").textContent = values.humidity + "%";

  // Set Visibility
  document.getElementById("daily-visibility").textContent = values.visibility.toFixed(2) + " mi";

  // Set Sunrise/Sunset times
  const sunriseTime = new Date(values.sunriseTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const sunsetTime = new Date(values.sunsetTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  document.getElementById("daily-sunrise-and-sunset").textContent = `${sunriseTime}/${sunsetTime}`;
}
