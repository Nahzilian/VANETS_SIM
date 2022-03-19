const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
var randomColor = require('randomcolor');

const defaultData = require('../assets/query.json')

require('dotenv').config()

const getDirection = ({origin, destination}) => {
    return client
    .directions({
        params: {
            origin: origin,
            destination: destination,
            key: process.env.API_KEY,
            mode: 'DRIVING'
        }
    })
    .then((r) => {
        return r.data
    })
    .catch((e) => {
        console.log(e.response.data.error_message);
        return null
    });
    
}


const getRandomCoord = async () => {
    let coords = []
    for (const item of defaultData) {
        let googleMapData = await getDirection(item)
        let path = []
        let step = 10
        for (let route of googleMapData.routes) {
            let legs = route.legs.map((obj) => {
                return {
                    start: obj.start_location,
                    end: obj.end_location,
                    latSpeed: (obj.start_location.lat - obj.end_location.lat) / step,
                    lngSpeed: (obj.start_location.lng - obj.end_location.lng) / step,
                    
                }
            })

            path = path.concat(legs)
        }

        coords.push(path)
    }
    return coords
}

const getDefaultDirection = async () => {
    let data = []
    let coordsData = await getRandomCoord()

    for (let coord of coordsData) {
        
        data.push({
            color: randomColor(),
            path: coord,
        })
    }

    return data
}


module.exports.getDirection = getDirection
module.exports.getDefaultDirection = getDefaultDirection

