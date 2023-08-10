//global variables needed
const search = document.getElementById('search');
const apiKey = '853c7e45dec1706d5f746a46f8d87cf8';
let cityName = '';
let currentWeatherContainer = document.getElementById('current-weather-container');

//intializes everything
function searchHandler() {
    let userInput = document.querySelector('input');
    cityName = userInput.value;
    searchHistory(cityName);
    getCoords(cityName);
}

//Pulls search history if applicable
function searchHistory(cityName) {
    let recentSearch = cityName;
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(recentSearch);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistoryUI(history);
}

//puts history on page
function updateHistoryUI(history) {
    let historyContainer = document.querySelector('#history-container');
    historyContainer.innerHTML = ''; 
    
    //giving each unique ids
    history.forEach((search, index) => {
        let pEl = document.createElement('p');
        pEl.textContent = search;
        pEl.setAttribute('id', `search-${index}`);
        historyContainer.appendChild(pEl);
    });
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
        populateWeather(data);
    });
}

function populateWeather(data) {
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

    ulEl.setAttribute("id", cityName )
    
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
        let forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ''; 
        
        for(let i = 0; i < data.list.length; i += 8) {
            let forecastItem = data.list[i];
            let forecastDateTime = new Date(forecastItem.dt * 1000);
            
            const forecastItemContainer = document.createElement('div');
            forecastItemContainer.classList.add('forecast-item');
            
            const pDateTime = document.createElement('p');
            pDateTime.textContent = forecastDateTime.toLocaleString(); 
            forecastItemContainer.appendChild(pDateTime);
            
            const ulEl = document.createElement('ul');
            
            const liEl1 = document.createElement('li');
            liEl1.textContent = `Temperature: ${forecastItem.main.temp}`;
            ulEl.appendChild(liEl1);

            const liEl2 = document.createElement('li');
            liEl2.textContent = `Humidity: ${forecastItem.main.humidity}`;
            ulEl.appendChild(liEl2);

            const liEl3 = document.createElement('li');
            liEl3.textContent = `Feels Like: ${forecastItem.main.feels_like}`;
            ulEl.appendChild(liEl3);

            const liEl4 = document.createElement('li');
            liEl4.textContent = `Wind Speed: ${forecastItem.wind.speed}`;
            ulEl.appendChild(liEl4);

            const liEl5 = document.createElement('li');
            liEl5.textContent = `Description: ${forecastItem.weather[0].description}`;
            ulEl.appendChild(liEl5);

            ulEl.setAttribute("id", cityName )

            forecastItemContainer.appendChild(ulEl);

            const iconUrl = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`;
            const imgEl = document.createElement('img');
            imgEl.setAttribute("src", iconUrl);
            forecastItemContainer.appendChild(imgEl);

            forecastContainer.appendChild(forecastItemContainer);
        }
    });
}

// called at startup
function initialize() {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    updateHistoryUI(history);
}

initialize();

search.addEventListener('click', searchHandler);


