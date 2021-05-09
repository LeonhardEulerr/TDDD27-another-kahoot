import io from 'socket.io-client';
const ENDPOINT = 'localhost:3000';
const socket = io(ENDPOINT);

export default socket;
