import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ChatScreen from './Screens/ChatScreen/ChatScreen';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/chatroom" element={<ChatScreen />} />
			</Routes>
		</div>
	);
}

export default App;
