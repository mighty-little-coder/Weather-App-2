// Set current date on screen using dayjs.
function displayTime() {
  var currentTime = dayjs().format('dddd MMM DD, YYYY');
  setToday.textContent = currentTime;
}

// Open Weather API key:
var APIkey = "3ac4c533f75c393e9ad9feff434508cf"

var currentLocation = document.getElementById("searchLocation")
var currentIcon = document.getElementById("todayIcon")
var currentTemp = document.getElementById("todayTemp")
var currentWind = document.getElementById("todayWind")
var currentHumidity = document.getElementById("todayHumid")
var searchArea = document.querySelector(".locationEl")
var weatherDisplay = document.querySelector(".weatherContainer")
var searchSubmit = document.querySelector("#locationSearch");
var locations = document.querySelector(".locationEl")
var setToday = document.querySelector(".todaysDate");
var pastDest = document.querySelector(".prevList");
var city;

// Setting all the DOM elements as variables from the forecast-container:
var forecast1 = document.getElementById("card1")
day1DateEl.textContent = today.add(1, 'day').format('dddd MMMM D')
var foreIcon1 = document.getElementById("forecastIcon1")
var foreTemp1 = document.getElementById("forecastTemp1")
var foreWind1 = document.getElementById("forecastWind1")
var foreHumid1 = document.getElementById("forecastHumid1")

var forecast2 = document.getElementById("card2")
day2DateEl.textContent = today.add(2, 'day').format('dddd MMMM D')
var foreIcon2 = document.getElementById("forecastIcon2")
var foreTemp2 = document.getElementById("forecastTemp2")
var foreWind2 = document.getElementById("forecastWind2")
var foreHumid2 = document.getElementById("forecastHumid2")

var forecast3 = document.getElementById("card3")
day3DateEl.textContent = today.add(3, 'day').format('dddd MMMM D')
var foreIcon3 = document.getElementById("forecastIcon3")
var foreTemp3 = document.getElementById("forecastTemp3")
var foreWind3 = document.getElementById("forecastWind3")
var foreHumid3 = document.getElementById("forecastHumid3")

var forecast4 = document.getElementById("card4")
day4DateEl.textContent = today.add(4, 'day').format('dddd MMMM D')
var foreIcon4 = document.getElementById("forecastIcon4")
var foreTemp4 = document.getElementById("forecastTemp4")
var foreWind4 = document.getElementById("forecastWind4")
var foreHumid4 = document.getElementById("forecastHumid4")

var forecast5 = document.getElementById("card5")
day5DateEl.textContent = today.add(5, 'day').format('dddd MMMM D')
var foreIcon5 = document.getElementById("forecastIcon5")
var foreTemp5 = document.getElementById("forecastTemp5")
var foreWind5 = document.getElementById("forecastWind5")
var foreHumid5 = document.getElementById("forecastHumid5")

// Objects pertaining to previous searches
var destinationsArray = []

// This variable will store the value of that the user types.
var searchDest = document.querySelector("#locationTextBox");

// This function is linked to the search button, telling it to start the chain
// of functions that will retrieve our data using what the user has typed.
function inputLocation() {

  searchCity(searchDest.value)
}

// In order to get weather info from open weather, we first have to get the 
// coordinates of our location using the US zip code. That is what this 
// searchCity() function is doing.
function searchCity(cityName,state) {
  weatherDisplay.style.display = ""

  var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state}&limit=1&appid=${weatherAPIKey}`;

  fetch(locationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.lat
      var lon = data.lon
      getCurrentWeather(lat, lon, zip)
      fiveDayForecast(lat, lon)
    });

}

// The this function will take our the coordinates and grab current info on the
// location and it's current weather.
function getCurrentWeather(lat, lon, zip) {
  var currentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"

  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var location = data.name
      var icon = data.weather[0].icon
      var currentTemp = data.main.temp + " °F"
      var currentWind = data.wind.speed + " MPH"
      var currentHumidity = data.main.humidity + "%"
      recentSearchArray.push({ location: location, zip: zip });
      localStorage.setItem("Zip-Code", JSON.stringify(recentSearchArray))
      logCurrentWeather(location, icon, currentTemp, currentWind, currentHumidity)
    });

}

// This function will take the data that we have retrieved from the API and log 
// it to the current-conditions container.
function logCurrentWeather(location, icon, temp, wind, humidity) {
  location.textContent = location
  currentIcon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  currentTemp.textContent = temp
  currentWind.textContent = wind
  currentHumidity.textContent = humidity

  // If statement checks to see if the text box value is empty, if it is then it will not create another button.
  // This prevents doubles of buttons appearing in the recent searches section because if a user is typing a location into
  // the search box, it will not be empty thus running the recentSearches() function which will create a new button.
  // However, if the user clicks on a button for a recent search rather than actually typing a location, the if statement will
  // see that the value of the text box is empty and WILL NOT run the recenetSearches function()
  if (weatherDisplay.value === "") {
    destinationsArray = []
    return
  } else {
    recentHistory()
  }

}



//

// CHECK FROM THIS POINT ONWARD... FUNCTIONALITY BREAKS

//




// The this function will take our the coordinates and grab info on the
// locations weather for the next 5 days.
function fiveDayForecast(lat, lon) {
  var futureCastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"

  fetch(futureCastAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var day1 = data.list[3]
      var day2 = data.list[11]
      var day3 = data.list[19]
      var day4 = data.list[27]
      var day5 = data.list[35]
      logFiveDayForecast(day1, day2, day3, day4, day5)
    });
}

// This function will take the data that we have retrieved from the API and log 
// it to the forecast-container.
function logFiveDayForecast(day1, day2, day3, day4, day5) {
  forecastIcon1.src = "https://openweathermap.org/img/wn/" + day1.weather[0].icon + "@2x.png"
  forecastIcon2.src = "https://openweathermap.org/img/wn/" + day2.weather[0].icon + "@2x.png"
  forecastIcon3.src = "https://openweathermap.org/img/wn/" + day3.weather[0].icon + "@2x.png"
  forecastIcon4.src = "https://openweathermap.org/img/wn/" + day4.weather[0].icon + "@2x.png"
  forecastIcon5.src = "https://openweathermap.org/img/wn/" + day5.weather[0].icon + "@2x.png"

  forecastTemp1.textContent = day1.main.temp + " °F"
  forecastTemp2.textContent = day2.main.temp + " °F"
  forecastTemp3.textContent = day3.main.temp + " °F"
  forecastTemp4.textContent = day4.main.temp + " °F"
  forecastTemp5.textContent = day5.main.temp + " °F"

  forecastWind1.textContent = day1.wind.speed + " MPH"
  forecastWind2.textContent = day2.wind.speed + " MPH"
  forecastWind3.textContent = day3.wind.speed + " MPH"
  forecastWind4.textContent = day4.wind.speed + " MPH"
  forecastWind5.textContent = day5.wind.speed + " MPH"

  forecastHumid1.textContent = day1.main.humidity + "%"
  forecastHumid2.textContent = day2.main.humidity + "%"
  forecastHumid3.textContent = day3.main.humidity + "%"
  forecastHumid4.textContent = day4.main.humidity + "%"
  forecastHumid5.textContent = day5.main.humidity + "%"
}

// This function is taking our search results and logging them under the search
// bar as buttons to recall data.
function recentHistory() {
  var getData = JSON.parse(localStorage.getItem("Zip-Code"))

  var newZip = getData[0].zip

  var recentSearchBtn = document.createElement("button")
  recentSearchBtn.setAttribute("id", newZip)
  recentSearchBtn.setAttribute("style", "cursor: pointer")
  recentSearchBtn.addEventListener("click", function (event) {
    searchCity(event.target.id)
    typeZipCode.value = ""
  })
  recentSearchBtn.textContent = getData[0].location
  recentSearchEl.appendChild(recentSearchBtn)
  recentSearchArray = []

}