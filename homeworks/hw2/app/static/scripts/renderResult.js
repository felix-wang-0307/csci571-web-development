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