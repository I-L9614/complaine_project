import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()


const MONGO_URL = process.env.MONGO_URI ||  "mongodb+srv://itamar:B3UNAbgEyabV5@complains.valgavc.mongodb.net/?appName=complains"
const DB_NAME = "complaintsDb";
const COLLECTION_NAME = "complaints"

let mongoClient = null;


export async function initMongoDb() {
    try {
        mongoClient = new MongoClient(MONGO_URL);
        await mongoClient.connect();
    } catch (error) {
        console.error("Error initializing database:", error);
        mongoClient = null
    }
}

export async function getMongoDbConnection() {
    if (!mongoClient) await initMongoDb()
    return mongoClient.db(DB_NAME);
}


export async function disconnect(){
    await mongoClient.disconnect()
    mongoClient = null;
}