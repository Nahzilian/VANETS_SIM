import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { useInterval } from './hooks/useInterval';
import { isInRange } from './logic/createMap';
import './stylesheets/Map.css'
// import Direction from '../data/Direction'
// import Vehicle from '../data/Vehicle';



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

const Map = ({ loadedMarkers = [] }) => {

    const [markers, setMarkers] = useState(loadedMarkers)

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

    const recalculateNetwork = () => {
        // console.log(markers[0])
        // console.log(markers[1])

        // isInRange(markers[0].start, markers[1].start)
    }

    useInterval(() => {
        recalculatePosition()
        recalculateNetwork()
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
                    lat={val.direction.currentLat}
                    lng={val.direction.currentLng}
                    color={val.color}
                    callback={() => console.log(val.data)}
                />
            )
                : ""}


        </GoogleMapReact>


        </section >);
}

export default Map;