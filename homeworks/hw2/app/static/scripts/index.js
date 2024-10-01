import { clearForm, submitForm, toggleAutoDetect } from "./form.js"

document.getElementById("weather-form").addEventListener('submit', submitForm);
document.getElementById("weather-form").addEventListener('reset', clearForm);
document.getElementById("auto-detect").addEventListener('click', toggleAutoDetect);

