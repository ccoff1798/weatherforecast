const search = document.getElementById('search')
const apiKey = '853c7e45dec1706d5f746a46f8d87cf8'
let cityName = ''
let lat = 0
let lon = 0
let urlByLatLon = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid='+ apiKey

let urlByCity = 'api.openweathermap.org/data/2.5/forecast?q='+ cityName +'&appid='+ apiKey

function searchHandler(){
    let userInput = document.querySelector('input')
    cityName = userInput.textContent
    console.log(cityName)

}

search.addEventListener('click', searchHandler)
