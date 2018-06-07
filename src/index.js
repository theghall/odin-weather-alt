require('normalize.css');

// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */
import './assets/css/style.scss';
/* eslint-enable import/first */

function getZipForm() {
  return document.getElementById('zip-form');
}

function saveTimeOfRequest() {
  const now = Date.now();
  const form = getZipForm();
  const lastSubmit = form.querySelector('input[type="hidden"]');
  lastSubmit.value = now;
}

function requestTooSoon() {
  let tooSoon = false;
  const now = Date.now();
  const form = getZipForm();
  const lastSubmit = form.querySelector('input[type="hidden"]');
  const lastSubmitValue = parseInt(lastSubmit.value);
  tooSoon = lastSubmit === 0 ? false : now - lastSubmitValue < 600000;
  return tooSoon;
}

function buildOWMReq(zip, country) {
  return `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&units=imperial&APPID=${owmKey}`;
}

function handleError(error) {
  if (error.status) {
    return 'Unable to retrieve weather.';
  } else if (error instanceof TypeError) {
    return 'Please check your connection';
  } else {
    return error;
  }
}

function displayOWMImage(iconId) {
  const image = document.querySelector('#icon img');
  image.src = `https://openweathermap.org/img/w/${iconId}.png`;
}

function displayData(elemId, value) {
  const selector = `${elemId} p`;
  const element = document.querySelector(selector);
  element.textContent = value;
}

function displayLoading() {
  displayData('#city', 'Loading...');
}

function fillDisplay(response) {
  const degree = '\u00B0';
  const temp = Math.round(parseFloat(response.main.temp));
  const high = Math.round(parseFloat(response.main.temp_max));
  const low = Math.round(parseFloat(response.main.temp_min));

  displayData('#city', response.name);
  displayOWMImage(response.weather[0].icon);
  displayData('#temp', `${temp}${degree}F`);
  displayData('#high-low', `${high}${degree}/${low}${degree}`);
  displayData('#conditions', response.weather[0].main);
}

function getWeather(zip, country = 'us') {
  const request = fetch(buildOWMReq(zip, country));

  return request.then(
    response => {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response);
      }
    },
    err => {
      return Promise.reject(err);
    }
  );
}

function handleWeatherRequest(zip) {
  const timeoutPromise = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject('Weather server took too long to respond.');
    }, 20000);
  });

  const weatherRequest = Promise.race([getWeather(zip), timeoutPromise]);

  weatherRequest.then(
    response => {
      saveTimeOfRequest();
      fillDisplay(response);
    },
    error => {
      alert(handleError(error));
    }
  );
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target.parentNode;
  const zip = form.querySelector('input[name="zip"]').value;

  if (zip.length === 0 || !/^\d{5}$/.test(zip)) {
    alert('Invalid ZIP');
  } else if (!requestTooSoon()) {
    displayLoading();
    handleWeatherRequest(zip);
  } else {
    alert('You can only request weather every 10 minutes');
  }
}

function addSubmitListener() {
  const button = document.querySelector('input[type="submit"]');
  button.addEventListener('click', handleSubmit);
}

addSubmitListener();
