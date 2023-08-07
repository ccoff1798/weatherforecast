const search = document.getElementById('search')
const apiKey = '853c7e45dec1706d5f746a46f8d87cf8'
let cityName = ''
let lat = 0
let lon = 0
let urlByLatLon = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid='+ apiKey
let urlByCity = 'https://api.openweathermap.org/data/2.5/forecast?q='+ cityName +'&appid='+ apiKey
let currentWeatherContainer = document.getElementById('current-weather-container')


function searchHandler(){
    let userInput = document.querySelector('input')
    cityName = userInput.value
    getCoords(cityName)
    searchHistory(cityName)

}

function searchHistory(cityName){
   let recentSearch = cityName
   localStorage.setItem('history', recentSearch)
   let pEl = document.createElement('p')
   let historyContainer = document.querySelector('#history-container')
   pEl.textContent = recentSearch
   pEl.setAttribute('id', cityName)
   historyContainer.append(pEl)
   console.log(recentSearch)
   

}
function getApi(requestedUrl){
    fetch(requestedUrl)
        .then(function(response){
            if(response.status == 200){

            }
        })
}

function getCoords(cityName){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&appid=' + apiKey)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            lat = data[0].lat
            lon = data[0].lon
            getWeather(lat, lon)
        })
}
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        populatePage(data)
    })
}
function populatePage(data){
    let currentTemp = data.main.temp
    let humidity = data.main.humidity
    let feelsLike = data.main.feels_like
    let windspeed = data.wind.speed
    let description = data.weather[0].description
    let icon = data.weather[0].icon
    const pEl = document.createElement('p')
    const ulEl = document.createElement('ul')
    const liEl1 = document.createElement('li')
    const liEl2 = document.createElement('li')
    const liEl3 = document.createElement('li')
    const liEl4 = document.createElement('li')

    pEl.textContent = currentTemp
    currentWeatherContainer.appendChild(pEl)

    liEl1.textContent = humidity
    ulEl.appendChild(liEl1)

    liEl2.textContent = feelsLike
    ulEl.appendChild(liEl2)

    liEl3.textContent = windspeed
    ulEl.appendChild(liEl3)

    liEl4.textContent = description
    ulEl.appendChild(liEl4)
    
    currentWeatherContainer.appendChild(ulEl)

    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const imgEl = document.createElement('img')

    imgEl.setAttribute("src", iconUrl)
    currentWeatherContainer.appendChild(imgEl)

    

}
// //WIP trying to get ID of item clicked
// document.addEventListener('click', function{
//     this.event.stopPropagation

// })
//forcast in 3 hour increments, need to convert to 8 hours at time, start at 0, jump to 8

search.addEventListener('click', searchHandler)
