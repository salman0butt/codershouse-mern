import express, { Application } from "express";
import dotenv from "dotenv";
import DbConnect from "./database";
import router from './routes';
import cors, { CorsOptions } from 'cors';

dotenv.config();
const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

DbConnect();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
