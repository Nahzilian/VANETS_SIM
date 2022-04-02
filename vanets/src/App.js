import React from 'react'
import './App.css';
import Map from './components/Map'
import Controller from './components/Controller';

function App() {
	return (
		<div className="wrapper" style={{ position: 'relative'}}>
			<Controller style={{display: 'block', position: 'absolute', zIndex: '3'}}></Controller>
			<Map style={{ position: 'relative'}}></Map>
		</div>
	);
}
export default App;
