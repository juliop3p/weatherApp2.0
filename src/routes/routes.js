const routes = require('express').Router()
const geo = require('../services/geo')
const forecast = require('../services/forecast')
const axios = require('axios')

const getAddress = async (latitude, longitude) => {
    try {
        const response = await axios(`http://geocode.xyz/${latitude},${longitude}?json=1`)
        const { city, state, country } = response.data
        return `${city}, ${state}, ${country}`
    } catch (err) {
        return { error: 'Unable to get your location!' }
    }
}

routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/about', (req, res) => {
    res.render('about')
})

routes.get('/weather', async (req, res) => {
    const address = req.query.address
    const latitudeBrowser = req.query.latitude
    const longitudeBrowser = req.query.longitude
    
    if(address === 'false') {
        const locationBrowser = await getAddress(latitudeBrowser, longitudeBrowser)
        const weatherBrowser = await forecast(latitudeBrowser, longitudeBrowser)
        
        return res.send({ location: locationBrowser, data: weatherBrowser })
    }

    if(!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const { latitude, longitude, location } = await geo(address)

    const weather = await forecast(latitude, longitude)
        
    return res.send({ location, data: weather })
})

module.exports = routes