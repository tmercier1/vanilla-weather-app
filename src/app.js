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
      "Sunday"
    ];
    let day = days[now.getDay()];
  
    h2.innerHTML = `${day} ${hours}:${minutes}`;
  
    return h2.innerHTML;
  }
  console.log(formatDate(new Date()));
  
  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
  
    let apiKey = "d617c3d443d0373f72548b3cda3fe85a";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric${units}`;
  
    axios.get(apiUrl).then(showWeather);
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
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
  
    let apiKey = "d617c3d443d0373f72548b3cda3fe85a";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showWeather);
  }
  
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
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
  
  let currentButton = document.querySelector(".current-button");
  currentButton.addEventListener("click", findCity);
  