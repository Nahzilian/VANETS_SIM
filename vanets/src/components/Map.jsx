import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { useInterval } from './hooks/useInterval';
import { getDefaultData, } from './logic/createMap';
import './stylesheets/Map.css'


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

            </div>
        </div>
    )
};

const Map = () => {

    const [markers, setMarkers] = useState()
    let counter = 0

    useEffect(() => {
        async function fetchData() {
            let data = await getDefaultData()
            console.log(data)
            setMarkers(data)
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
        if (counter + 1 < 10) {
            setMarkers(prev => {

                return prev.map((data) => {
                    return {
                        ...data,
                        initLat: data.initLat + data.path[0].latSpeed,
                        initLng: data.initLng + data.path[0].lngSpeed
                    }
                })
            })

            counter += 1
        } else {
            counter = 0
        }



    }

    useInterval(() => {
        if (markers) {
            recalculatePosition()
        }
    }, [1000])


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
                        lat={val.initLat}
                        lng={val.initLng}
                        color={val.color}
                        callback={() => console.log("Yololll")}
                    />
                )
                    : ""}


            </GoogleMapReact>


        </section>);
}

export default Map;