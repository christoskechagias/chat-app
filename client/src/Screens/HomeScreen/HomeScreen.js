import React from 'react';
import './HomeScreen.css';
import io from 'socket.io-client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUpRoomAction } from '../../Redux/Actions/RoomActions';

const socket = io.connect('http://localhost:5000/');
function HomeScreen() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [room, setRoom] = useState('');
	const [username, setUsername] = useState('');

	const connectRoomHandler = () => {
		if (username != '' && room != '') {
			socket.emit('join_room', room);
			dispatch(setUpRoomAction(username, room, socket));
			navigate('/chatroom');
		}
	};
	return (
		<div className="homeScreen">
			<h1 className="homeScreen-header">Chat App</h1>
			<div className="homeScreen-roomContainer">
				<p>Enter in a room:</p>
				<input
					id="customInput"
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					id="customInput"
					type="text"
					placeholder="Room"
					value={room}
					onChange={(e) => setRoom(e.target.value)}
					required
				/>
				<button id="customButton" onClick={connectRoomHandler}>
					Enter
				</button>
			</div>
		</div>
	);
}

export default HomeScreen;
