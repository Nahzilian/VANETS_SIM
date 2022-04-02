import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { useInterval } from './hooks/useInterval';
import { getDefaultData, } from './logic/createMap';
import './stylesheets/Map.css'
import Direction from '../data/Direction'



const Marker = ({ color, callback = {} }) => {


    const markerStyle = {
        backgroundColor: color
    }

    const markerRadiusStyle = {

        backgroundColor: `${color}31`,
        border: `1px solid ${color}`

    }

    return (
        <div className="marker-radius" onClick={() => callback()} style={markerRadiusStyle}>
            <div className="marker" style={markerStyle}>
                {/* {text} */}
            </div>
        </div>
    )
};

const Map = () => {

    const [markers, setMarkers] = useState()

    useEffect(() => {
        async function fetchData() {
            let data = await getDefaultData()
            // console.log(data)
            let directionData = data.map((route) => {
                return {
                    direction: new Direction(route),
                    color: route.color,
                    name: route.name
                }
            })
            // console.log(directionData)
            setMarkers(directionData)
        }
        fetchData()
    }, [])

    const defaultProps = {
        center: {
            lat: 43.66,
            lng: -79.38
        },
        zoom: 16,
        // heading: 1
    };

    const recalculatePosition = () => {
        if (markers) {
            let newPos = []
            for (let marker of markers) {
                let newMarker =
                {
                    direction: marker.direction.updatePath(),
                    ...marker
                }
                newPos.push(newMarker)
            }

            setMarkers(newPos)
        }
    }

    useInterval(() => {
        recalculatePosition()
    }, [5])


    return (
        <section className="map-wrapper" style={{ height: '100vh', width: '100%' }}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}

            >
                {markers && markers.length > 0 ? markers.map((val, index) =>
                    <Marker
                        key={index}
                        lat={val.direction.currentLat}
                        lng={val.direction.currentLng}
                        color={val.color}
                        callback={() => console.log("Yololll")}
                    />
                )
                    : ""}


            </GoogleMapReact>


        </section>);
}

export default Map;