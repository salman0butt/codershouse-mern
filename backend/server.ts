import express, { Application } from "express";
import dotenv from "dotenv";
import DbConnect from "./database";
import router from './routes';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config();
const app: Application = express();
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
