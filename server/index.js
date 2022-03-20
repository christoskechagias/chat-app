const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});
server.listen('5000', () => {
	console.log('Server is running on port 5000');
});

io.on('connection', (socket) => {
	console.log(socket.id);

	socket.on('join_room', (data) => {
		socket.join(data);
	});
	socket.on('send_message', (data) => {
		socket.to(data.room).emit('recieve_message', data);
	});
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
