import { clearForm, submitForm, toggleAutoDetect } from "./form.js";

document.getElementById("weather-form").addEventListener("submit", submitForm);
document.getElementById("weather-form").addEventListener("reset", clearForm);
document
  .getElementById("auto-detect")
  .addEventListener("click", toggleAutoDetect);

const pointDown = document.querySelector(".point-down");
const pointUp = document.querySelector(".point-up");

pointDown.addEventListener("click", () => {
  pointDown.style.display = "none";
  pointUp.style.display = "flex";
  document.querySelector("#weather-charts .charts").style.display = "flex";
  // scroll the page to let the top being the "weather-charts" section
  window.scrollTo(0, document.querySelector("#weather-charts").offsetTop);
});

pointUp.addEventListener("click", () => {
  pointUp.style.display = "none";
  pointDown.style.display = "flex";
  document.querySelector("#weather-charts .charts").style.display = "none";
});
