function formatDate(now) {
    let h2 = document.querySelector("h2");
  
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[now.getDay()];
  
    h2.innerHTML = `${day} ${hours}:${minutes}`;
  
    return h2.innerHTML;
  }
  formatDate(new Date());

  function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");

    let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];

    let forecastHTML = `<div class="row">`;
    days.forEach(function(day) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
      <div class="weather-forecast-date">
        ${day}
        </div>
      <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="48" />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-max"> 
        18º </span> 
        <span class="weather-forecast-min"> 
        12º
        </span>
    </div>
    </div>
  `;
});

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  }

  function search(city) {
    let apiKey = "d617c3d443d0373f72548b3cda3fe85a";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    search(cityElement.value);
  
  }

  function getForecast(coordinates) {
    let apiKey = "d617c3d443d0373f72548b3cda3fe85a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    
    axios.get(apiUrl).then(displayForecast);
  }
  
  function showWeather(response) {

    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
  
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(response.data.main.temp);
  
    let description = document.querySelector("#todays-forecast");
    description.innerHTML = response.data.weather[0].description;
  
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
  
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = Math.round(response.data.main.humidity);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    fahrenheitTemperature = response.data.main.temp;

    getForecast(response.data.coord)
  }
  
  function showPosition(position) {
    let latitude = position.coord.latitude;
    let longitude = position.coord.longitude;
    let apiKey = "d617c3d443d0373f72548b3cda3fe85a";
    let units = "imperial";
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showWeather);
  }
  
  function findCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }

  function showFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  let fahrenheitTemperature = null;

  let currentButton = document.querySelector(".current-button");
  currentButton.addEventListener("click", findCity);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemperature);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);

  search("Los Angeles");
  displayForecast ();