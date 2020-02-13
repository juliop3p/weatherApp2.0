const axios = require('axios')

module.exports = async (latitude, longitude) => {
    try {
        const response = await axios(`https://api.darksky.net/forecast/978588183c116d0f386af57ad7674a24/${latitude},${longitude}?units=si`)
        const { temperature, summary: weatherStatus, humidity, windSpeed, icon } = response.data.currently
        const { temperatureHigh, temperatureLow } = response.data.daily.data[0]

        return { temperature: temperature.toFixed(0), weatherStatus, humidity, windSpeed, temperatureHigh, temperatureLow, icon }
    } catch(err) {
        return { error: 'Oops! something went wrong. try again!' }
    }
}