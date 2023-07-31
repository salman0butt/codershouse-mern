import express, { Application } from "express";
import dotenv from "dotenv";
import DbConnect from "./database";
import router from './routes';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser'
import ACTIONS from "./actions";

const app: Application = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http:/localhost:5000',
    methods: ['GET', 'POST'],
  }
});

dotenv.config();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cookieParser());

DbConnect();

const corsOptions: CorsOptions = {
  credentials: true,
  origin: ['http://localhost:3000']
}

app.use(cors(corsOptions));
app.use('/storage', express.static('storage'));
app.use(express.json({ limit: '8mb' }));
app.use(router);

// Sockets
const socketUserMapping = {};

io.on('connection', (socket: any) => {

  socket.on(ACTIONS.JOIN, ({ roomId, user }: any) => {
    socketUserMapping[socket.id] = user;
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
      const clients = Array.from(room);

      clients.forEach((clientId: any) => {
        io.to(clientId).emit(ACTIONS.ADD_PEER, {
          peerId: socket.id,
          createOffer: false,
          user
        });

        socket.emit(ACTIONS.ADD_PEER, {
          peerId: clientId,
          createOffer: true,
          user: socketUserMapping[clientId]
        });

      });
    }

    socket.join(roomId);
  });

  // Handle relay Ice - offer
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate
    });
  });

  // Handle relay sdp (session description - Answer)
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription
    });
  });

  // Handle mute/unmute
  socket.on(ACTIONS.MUTE, (({ roomId, userId }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
      const clients = Array.from(room);
      clients.forEach((clientId: any) => {
        io.to(clientId).emit(ACTIONS.MUTE, {
          peerId: socket.id,
          userId
        });
      });
    }
  }));

  socket.on(ACTIONS.UNMUTE, (({ roomId, userId }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
      const clients = Array.from(room);
      clients.forEach((clientId: any) => {
        io.to(clientId).emit(ACTIONS.UNMUTE, {
          peerId: socket.id,
          userId
        });
      });
    }
  }));

  socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
      const clients = Array.from(room);
      clients.forEach((clientId) => {
        if (clientId !== socket.id) {
          console.log('mute info');
          io.to(clientId).emit(ACTIONS.MUTE_INFO, {
            userId,
            isMute,
          });
        }
      });
    }
  });


  // Leaving the room
  const leaveRoom = ({ roomId }) => {
    const { rooms } = socket;

    Array.from(rooms).forEach((roomId: any) => {
      const room = io.sockets.adapter.rooms.get(roomId);
      if (room) {
        const clients = Array.from(room);

        clients.forEach((clientId: any) => {
          io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
            peerId: socket.id,
            userId: socketUserMapping[socket.id]?.id
          });

          socket.emit(ACTIONS.REMOVE_PEER, {
            peerId: clientId,
            userId: socketUserMapping[clientId]?.id
          })
        });
      }
      socket.leave(roomId);
    });
    delete socketUserMapping[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on('disconnecting', leaveRoom);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
