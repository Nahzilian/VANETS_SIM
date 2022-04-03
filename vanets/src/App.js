import { useState, useEffect } from 'react'
import './App.css';
import Map from './components/Map'
import Controller from './components/Controller';
import { getDefaultData, generateCommonData } from './components/logic/createMap';
import Direction from './data/Direction'
import Vehicle from './data/Vehicle';

function App() {
	const [markers, setMarkers] = useState()
	const [contactChecker, setContactChecker] = useState([])

	useEffect(() => {
		async function fetchData() {
			let data = await getDefaultData()
			// console.log(data)
			let directionData = data.map((route) => {
				let randomData = generateCommonData()
				return {
					direction: new Direction(route),
					color: route.color,
					data: new Vehicle(route.name, {}, randomData),
					origin: route.origin,
					destination: route.destination
				}
			})
			console.log(directionData)
			for (let i = 0; i < directionData.length; i++) {
				let tempArr = new Array(directionData.length - 1).fill({})
				setContactChecker(prev => {
					prev.push(tempArr)
					return prev
				})
			}
			setMarkers(directionData)
		}
		fetchData()
	}, [])

	
	return (
		<div className="wrapper">
			{markers && markers.length > 0 && contactChecker.length > 0?
				<>
					<Controller data={markers} inRange={contactChecker}></Controller>
					<Map loadedMarkers={markers} setContactChecker={setContactChecker} contactChecker={contactChecker} />
				</>
				: ""}
		</div>
	);
}

export default App;
