import {MongoClient} from "mongodb";

const mongodbURL = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongodbURL);

const db_name = 'carRentalSystem'; 

export const connectionDB = async () => {
    try {
        await mongoClient.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.log("Error Connecting to the database", error);
    }
} 

export const db = mongoClient.db(db_name); 