// DOM
const weatherDiv = document.querySelector('.weather')

const getWeather = async ({ latitude, longitude }, address) => {
    const response = await fetch(`/weather?address=${address}&latitude=${latitude}&longitude=${longitude}`)
    return await response.json()
}

const now = new Date()
const day = now.getDay()
const hour = now.getHours()
const min = now.getMinutes()
let dayText = ''

switch(day) {
    case 0: dayText = 'Sunday'; break;
    case 1: dayText = 'Monday'; break;
    case 2: dayText = 'Tuesday'; break;
    case 3: dayText = 'Wednesday'; break;
    case 4: dayText = 'Thursday'; break;
    case 5: dayText = 'Friday'; break;
    case 6: dayText = 'Saturday'; break;
}

const draw = (weather) => {
    weather.data.error ?
    weatherDiv.innerHTML = 
    `
        <h2>${weather.data.error}</h2>
    `
    :
    weatherDiv.innerHTML = 
    `
        <div class="top-info">
            <h2>${weather.location.error ? 'Your Location' : weather.location}</h2>
            <h3>${dayText} ${hour}:${min}</h3>
            <h3>${weather.data.weatherStatus}</h3>
        </div>
        <div class="left-info">
            <img src="/images/${weather.data.icon}.png" alt="weather icon" />
            <h1>${weather.data.temperature}°C</h1>
        </div>
        <div class="right-info">
            <h3>Humidity: ${weather.data.humidity}%</h3>
            <h3>Wind: ${weather.data.windSpeed}km/h</h3>
        </div>
    `
}

document.querySelector('form').addEventListener('submit', async event => {
    event.preventDefault()

    weatherDiv.innerHTML = '<h1>Loading...</h1>'
    
    const address = document.querySelector('form input').value

    draw(await getWeather({}, address))
})

const getLocation = _ => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords
            draw(await getWeather({latitude, longitude}, false))
        })
    } else {
        return null
    }
    
}

getLocation()