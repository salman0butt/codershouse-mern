import mongoose, { ConnectOptions } from "mongoose";

async function DbConnect() {
    const DB_URL: string = process.env.DB_URL;
    if (!DB_URL) {
        console.error("DB_URL not found in environment variables");
        return;
      }
   try {
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
    }
}


export default DbConnect;
