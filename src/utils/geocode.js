const request = require('request')

/*
const url = 'http://api.weatherstack.com/current?access_key=8730c55865a7a9d55b867afc5925d653&query=43.343033,17.807894'

request({url: url, json: true }, (err, response) => {
    if (err) {
        console.log('Unable to connect to weather services!')
    } else if (response.body.error) {
        console.log('Unable to find location')
    }else {
        console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degres out. It is feel like ' + response.body.current.feelslike + ' degress out.' )
    }
    
})
*/

/* const url_geomap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/mostar.json?access_token=pk.eyJ1IjoiYXplcmdlb21hcCIsImEiOiJja3N4MmZnNXcyNXBrMzJvZHBvcDJ3aDNmIn0.oPH2yBuuqACq-njPmaImrA&limit=1'

request({url: url_geomap, json: true }, (err, response) => {    

    if (err) {
        console.log('Unable to connect to weather services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    }else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude)
    }
    
})   */

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXplcmdlb21hcCIsImEiOiJja3N4MmZnNXcyNXBrMzJvZHBvcDJ3aDNmIn0.oPH2yBuuqACq-njPmaImrA&limit=1'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

const weather = (geocode, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=8730c55865a7a9d55b867afc5925d653&query='+ geocode.latitude +', '+ geocode.longitude +','

    request({url: weatherUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degres out. It is feel like ' + response.body.current.feelslike + ' degress out.' )
        }
    })
}

module.exports = geocode;