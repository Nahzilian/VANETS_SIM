import { useState, useEffect } from 'react';

import './stylesheets/Controller.css'
const DataItem = ({ icon, data, unit, label = "Label" }) => {

    return (<div className="data-item">
        <div className="icon">
            <div>
                <i className={`bi ${icon}`}></i>
            </div>
            <div>
                {label}
            </div>
        </div>
        <div className="data">{data}</div>
        <div className="unit">{unit}</div>
    </div>)
}

const Controller = ({ data }) => {

    // weather: '',
    //     temperature: '',
    //     isTrafficJam: randomTrafficJam % 2 === 0,
    //     isLatest: randomLatest % 2 === 0

    const [carData, setCarData] = useState(data)
    const [currentCar, setCurrentCar] = useState(data[0])
    // const [network, setNetwork] = useState()
    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectCar = (index) => {
        setSelectedIndex(index)
        setCurrentCar(carData[index])
    }

    return (<div className="controller-wrapper">
        <div className="controller-title">
            vanets data center
        </div>
        <div className="controller">
            <div className="controller-vehicle">
                {carData && carData.length > 0 ?
                    carData.map((car, key) =>
                        <button key={key} className={`car-${selectedIndex + 1}` === car.data.name ? 'active' : ''}
                            onClick={() => selectCar(key)}
                        >
                            {car.data.name}
                        </button>
                    ) : ""
                }

            </div>
        </div>
        <div className="section-title">
            <div>Car data</div>
            <div className="car-color" style={{backgroundColor: currentCar.color}}></div>
        </div>
        <div className="controller-data">
            <div className="location-data">
                <div>
                    <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                    {currentCar.origin}
                </div>
            </div>

            <div className="location-data">
                <div>
                    <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                    {currentCar.destination}
                </div>
            </div>

            <DataItem icon={'bi-thermometer-half'} data={currentCar.data.commonData.weather} unit={''} label={'Temperature'} />
            <DataItem icon={'bi-cloud'} data={currentCar.data.commonData.temperature} unit={'\u2103'} label={'Weather'} />
            <DataItem icon={'bi-exclamation-triangle-fill'} data={currentCar.data.commonData.isTrafficJam ? "Crowded" : "Clear"} unit={''} label={'Traffic'} />
            <DataItem icon={'bi-calendar-check'} data={currentCar.data.isLatest ? "Yes" : "No"} unit={''} label={'Latest info'} />
        </div>
        <div className="section-title">Captured data</div>

    </div >);
}

export default Controller;