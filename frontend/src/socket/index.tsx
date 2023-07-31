import { io, Socket } from 'socket.io-client';
import { SocketOptions } from '../types/socketInit'; // Import the defined types from the declaration file

const socketInit = (): Socket => {
    const options: SocketOptions = {
        'force new connection': true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };
    // return io(process.env.REACT_APP_SOCKET_SERVER_URL, options);
    return io('http://localhost:5000/', options);
};

export default socketInit;