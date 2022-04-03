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

const InRangeDataItem = ({ data }) => {
    if (data && data.color)
    return (<div className="in-range-item">
        <div className="data-title">
            {data.data.name}
        </div>
        <div className="in-range-data-wrapper">
            <div><i className='bi bi-thermometer-half'></i> &#8451;</div>
            <div><i className='bi bi-cloud'></i></div>
            <div><i className='bi bi-exclamation-triangle-fill'></i></div>
            <div><i className='bi bi-calendar-check'></i></div>
            <div>{data.data.commonData.temperature}</div>
            <div>{data.data.commonData.weather}</div>
            <div>{data.data.commonData.isTrafficJam ? "Crowded" : "Clear"}</div>
            <div>{data.data.commonData.isLatest ? "Yes" : "No"}</div>
        </div>
    </div>)

    return <></>
}

const Controller = ({ data, inRange }) => {

    // weather: '',
    //     temperature: '',
    //     isTrafficJam: randomTrafficJam % 2 === 0,
    //     isLatest: randomLatest % 2 === 0

    const [carData, setCarData] = useState(data)
    const [currentCar, setCurrentCar] = useState(data[0])
    // const [network, setNetwork] = useState()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [inRangeData, setInRangeData] = useState(inRange)
    // const [currentInRangeData, setCurrentInRangeData] = useState()

    const selectCar = (index) => {
        setSelectedIndex(index)
        setCurrentCar(carData[index])
    }

    useEffect(() => {
        setInRangeData(inRange)
    }, [inRange])

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
            <div className="car-color" style={{ backgroundColor: currentCar.color }}></div>
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
        <div className="in-range-data">
            {inRangeData && inRangeData.length > 0 ?
                inRangeData[selectedIndex].map((d, key) =>
                    < InRangeDataItem data={d} key={key} />
                ): ""}

        </div>

    </div >);
}

export default Controller;