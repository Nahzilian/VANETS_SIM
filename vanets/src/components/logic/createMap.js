import axios from 'axios'

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
