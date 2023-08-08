const search = document.getElementById('search');
const apiKey = '853c7e45dec1706d5f746a46f8d87cf8';
let cityName = '';
let currentWeatherContainer = document.getElementById('current-weather-container');

function searchHandler() {
    let userInput = document.querySelector('input');
    cityName = userInput.value;
    getCoords(cityName);
    searchHistory(cityName);
}

function searchHistory(cityName) {
    let recentSearch = cityName;
    localStorage.setItem('history', recentSearch);
    let pEl = document.createElement('p');
    let historyContainer = document.querySelector('#history-container');
    pEl.textContent = recentSearch;
    pEl.setAttribute('id', cityName);
    historyContainer.append(pEl);
    console.log(recentSearch);
}

function getCoords(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let lat = data[0].lat;
            let lon = data[0].lon;
            getWeather(lat, lon);
            getForecast(lat, lon);
        });
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        populatePage(data);
    });
}

function populatePage(data) {
    let currentTemp = data.main.temp;
    let humidity = data.main.humidity;
    let feelsLike = data.main.feels_like;
    let windspeed = data.wind.speed;
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;

    const pEl = document.createElement('p');
    const ulEl = document.createElement('ul');
    const liEl1 = document.createElement('li');
    const liEl2 = document.createElement('li');
    const liEl3 = document.createElement('li');
    const liEl4 = document.createElement('li');

    pEl.textContent = currentTemp;
    currentWeatherContainer.appendChild(pEl);

    liEl1.textContent = `Humidity: ${humidity}`;
    ulEl.appendChild(liEl1);

    liEl2.textContent = `Feels Like: ${feelsLike}`;
    ulEl.appendChild(liEl2);

    liEl3.textContent = `Wind Speed: ${windspeed}`;
    ulEl.appendChild(liEl3);

    liEl4.textContent = `Description: ${description}`;
    ulEl.appendChild(liEl4);
    
    currentWeatherContainer.appendChild(ulEl);

    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const imgEl = document.createElement('img');
    imgEl.setAttribute("src", iconUrl);
    currentWeatherContainer.appendChild(imgEl);
}

function getForecast(lat, lon) {
    let urlByLatLon = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    fetch(urlByLatLon)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let ulEl = document.createElement('ul');
        let forecastContainer = document.getElementById('forecast-container');
        
        for(let i = 0; i < data.list.length; i += 8){
            let liEl = document.createElement('li');
            liEl.textContent = data.list[i].main.temp;  // I've assumed you might want to display the temperature, but change as needed
            ulEl.appendChild(liEl);
        }
        forecastContainer.appendChild(ulEl);
    });
}

search.addEventListener('click', searchHandler);
