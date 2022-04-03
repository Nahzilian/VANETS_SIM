import { useState, useEffect } from 'react'
import './App.css';
import Map from './components/Map'
import Controller from './components/Controller';
import { getDefaultData, generateCommonData } from './components/logic/createMap';
import Direction from './data/Direction'
import Vehicle from './data/Vehicle';

function App() {
	const [markers, setMarkers] = useState()

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
			setMarkers(directionData)
		}
		fetchData()
	}, [])
	return (
		<div className="wrapper">
			{markers && markers.length > 0 ?
				<>
					<Controller data={markers}></Controller>
					<Map loadedMarkers={markers} />
				</>
				: ""}
		</div>
	);
}

export default App;
