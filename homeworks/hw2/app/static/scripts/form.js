
function getFormItems() {
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const autoDetect = document.getElementById('auto-detect').checked;
  return { street, city, state, autoDetect };
}

function submitForm(event) {
  event.preventDefault();
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const autoDetect = document.getElementById('auto-detect').checked;

  console.log('Street:', street);
  console.log('City:', city);
  console.log('State:', state);
  console.log('Auto-detect:', autoDetect);

  // You can now use these values to perform further actions, such as sending them to a server
}

function clearForm() {
  console.log("Clearing form");
  document.getElementById('street').value = '';
  document.getElementById('city').value = '';
  document.getElementById('state').value = '';
  document.getElementById('auto-detect').checked = false;
  toggleAutoDetect();
}

function toggleAutoDetect() {
  const isAutoDetect = document.getElementById('auto-detect').checked;
  const street = document.getElementById('street');
  const city = document.getElementById('city');
  const state = document.getElementById('state');

  street.disabled = isAutoDetect;
  city.disabled = isAutoDetect;
  state.disabled = isAutoDetect;
}