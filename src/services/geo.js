const axios = require('axios')

module.exports = async (location) => {
    
    try {
        const response = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoianVsaW9wM3AiLCJhIjoiY2s2ZjR2NTA3MjU4YTNtcWpvMmMxNWp0OSJ9.XQUdIxFGy7hZMX0MlnfkdA`)
            if(response.data.features.length < 1) {
                return { error: 'Please, provide a correct location!' }
            }
            const { place_name } = response.data.features[0]
            const [longitude, latitude] = response.data.features[0].center

            return { location: place_name, latitude, longitude }
        } catch (err) {
            return { error: 'You must have a internet connection to get your weather!' }
        }
}