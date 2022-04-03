const { Client } = require("@googlemaps/google-maps-services-js");
var randomColor = require('randomcolor');
const fs = require('fs')
const defaultData = require('../assets/query.json')

const client = new Client({});
const STEPS = 100

require('dotenv').config()


const tempCache = []
const getDirection = ({ origin, destination }) => {
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


const getDefaultCoord = async (item) => {
    // let coords = []
    // for (const item of defaultData) {
    let googleMapData = await getDirection(item)
    let path = []

    for (let route of googleMapData.routes) {
        // let directionNode = {}
        let steps = route.legs[0].steps

        let directionNodes = steps.map((obj) => {
            return {
                start: obj.start_location,
                end: obj.end_location,
                latSpeed: (obj.end_location.lat - obj.start_location.lat) / STEPS,
                lngSpeed: (obj.end_location.lng - obj.start_location.lng) / STEPS
            }
        })


        path = path.concat(directionNodes)
    }
    return path
    //     coords.push(path)
    // }
    // return coords
}

const getDefaultDirection = async () => {
    // if (tempCache.length > 0) {
    //     console.log(tempCache)
    //     return tempCache
    // }

    let data = []
    let counter = 1

    // for (let coord of coordsData) {

    for (const item of defaultData) {
        let coordsData = await getDefaultCoord(item)
        data.push({
            color: randomColor({luminosity: 'dark'}),
            steps: STEPS,
            path: coordsData,
            name: `car-${counter}`,
            origin: item.origin,
            destination: item.destination
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

