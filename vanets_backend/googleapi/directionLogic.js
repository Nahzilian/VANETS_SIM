const { Client } = require("@googlemaps/google-maps-services-js");
var randomColor = require('randomcolor');
const fs = require('fs')
const defaultData = require('../assets/query.json')

const client = new Client({});
const STEPS = 1000

require('dotenv').config()


const tempCache = []
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
        
        for (let route of googleMapData.routes) {
            // let directionNode = {}
            let steps = route.legs[0].steps
        
            let directionNodes = steps.map((obj) => {
                return {
                    start : obj.start_location,
                    end : obj.end_location,
                    latSpeed : (obj.end_location.lat - obj.start_location.lat) / STEPS,
                    lngSpeed : (obj.end_location.lng - obj.start_location.lng) / STEPS
                }
            })


            path = path.concat(directionNodes)
        }
        coords.push(path)
    }
    return coords
}

const getDefaultDirection = async () => {
    // if (tempCache.length > 0) {
    //     console.log(tempCache)
    //     return tempCache
    // }
    
    let data = []
    let coordsData = await getRandomCoord()
    let counter = 1

    for (let coord of coordsData) {
        
        data.push({
            color: randomColor(),
            steps: STEPS,
            path: coord,
            name: `car-${counter}`
        })
        counter += 1
    }

    // fs.writeFile('./test.json', JSON.stringify(data), err => {
    //     if (err) 
    //         console.error(err)
    // })
    return data
}


module.exports.getDirection = getDirection
module.exports.getDefaultDirection = getDefaultDirection

