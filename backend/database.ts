import mongoose, { ConnectOptions } from "mongoose";

function DbConnect() {
    const DB_URL: string = process.env.DB_URL;
    if (!DB_URL) {
        console.error("DB_URL not found in environment variables");
        return;
      }
    // Database Connection
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('DB connected...')
    })
}

export default DbConnect;
