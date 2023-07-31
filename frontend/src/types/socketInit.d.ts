import { Socket } from 'socket.io-client';

// Type declaration for the 'options' object
export interface SocketOptions {
    'force new connection': boolean;
    reconnectionAttempts: number;
    timeout: number;
    transports: string[];
}

// Type declaration for the 'socketInit' function
declare const socketInit: () => Socket;

export default socketInit;
