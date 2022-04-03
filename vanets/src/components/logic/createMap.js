import axios from 'axios'

const WEATHER = ['Sunny', 'Windy', 'Rainy', 'Snowy']

const dataFormat = (data) => {
    let placeHolder = data
    for (const item of placeHolder) {
        item.initLat = item.path[0].start.lat
        item.initLng = item.path[0].start.lng
    }

    return placeHolder
}
export const getDefaultData = async () => {
    let data
    await axios.get('http://localhost:4000/api/direction').then((res) => data = res.data
    ).catch((err) => {
        console.error(err)
        data = null
    })

    return dataFormat(data)
}

export const generateCommonData = () => {
    let randomLatest = Math.floor(Math.random() * 2)
    let randomTrafficJam = Math.floor(Math.random() * 2)
    let randomWeather = Math.floor(Math.random() * 4)

    let randomTemperature = Math.floor(Math.random() * 25)

    return {
        weather: WEATHER[randomWeather],
        temperature: randomWeather === 3 ? -randomTemperature : randomTemperature,
        isTrafficJam: randomTrafficJam % 2 === 0,
        isLatest: randomLatest % 2 === 0
    }
}

const calculateRange = (start, end) => {
    let d = ((start.lat - end.lat) ** 2) + ((start.lng - end.lng) ** 2)
    return Math.sqrt(d)
}

export const isInRange = (start, end) => {
    let calculatedRange = calculateRange(start, end)
    return 0.001 > calculatedRange
}