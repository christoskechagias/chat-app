import React, { useState, useEffect } from 'react';
import './ChatScreen.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ScrollToBottom from 'react-scroll-to-bottom';

function ChatScreen() {
	const navigate = useNavigate();
	const { data } = useSelector((state) => state.room);
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		if (data) {
			data.socket.on('recieve_message', (data) => {
				setMessageList((list) => [...list, data]);
			});
		} else {
			navigate('/');
		}
	}, [data?.socket]);

	const sendMessageHandler = async () => {
		if (currentMessage != '') {
			const messageData = {
				room: data.room,
				author: data.username,
				message: currentMessage,
				time:
					new Date(Date.now()).toDateString() +
					', ' +
					new Date(Date.now()).toLocaleTimeString(),
			};
			await data.socket.emit('send_message', messageData);
			setMessageList((list) => [...list, messageData]);
			setCurrentMessage('');
		}
	};
	return (
		<div className="chatScreen">
			<div className="chatScreen-header">
				<h1>Room: {data?.room}</h1>
			</div>
			<div className="chatScreen-container">
				<ScrollToBottom className="chatScreen-messageListContainer">
					{messageList.map((item, index) => {
						const { author, message, time } = item;
						return (
							<div
								className="chatScreen-messageContainer"
								key={index}
								id={author == data.username && 'me'}
							>
								<div className="chatScreen-avatar">
									<Avatar sx={{ width: 24, height: 24 }}>{author[0]}</Avatar>
								</div>
								<span className="chatScreen-message">{message}</span>
								<span className="chatScreen-messageTime">{time}</span>
							</div>
						);
					})}
				</ScrollToBottom>
				<div className="chatScreen-newMessageContainer">
					<input
						id="customInput"
						value={currentMessage}
						placeholder="New message"
						onChange={(e) => setCurrentMessage(e.target.value)}
					/>
					<button id="customButton" onClick={sendMessageHandler}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChatScreen;
