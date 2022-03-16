import { useState, useEffect } from 'react'
import './stylesheets/Map.css'
import { getMapSize, generateBuildings } from './logic/createMap'

const ObjectGrid = ({ id, data }) => {
    return (<div className={`object-grid ${data && data.class? data.class: ''}`}>{id}</div>)
}


const Map = () => {
    
    const [objectGrids, setObjectGrids] = useState([])

    useEffect(() => {
        let temp = []
        let mapSize = getMapSize()
        
        let buildingSets = generateBuildings(10, mapSize)
        for (let i = 0; i < mapSize; i++) {
            let tempData = {id: i}
            if (buildingSets.has(i)) tempData.class="building"
            temp.push(tempData)
        }
        setObjectGrids(temp)
    }, [])

    return (
        <section className="map-wrapper">

            {objectGrids && objectGrids.length > 0 ? objectGrids.map((obj, key) => <ObjectGrid id={key} data={obj}/>) : ''}



        </section>);
}

export default Map;