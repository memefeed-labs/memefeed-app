import { io, Socket } from 'socket.io-client';

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100'
const socket: Socket = io(BASE_URL);

export default socket;
