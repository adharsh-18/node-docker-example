import { MongoClient, Db, Collection, Document } from 'mongodb';
import { mongoConfig } from './config/mongoConfig';

let client: MongoClient;
let database: Db;

/**
 * Initialize MongoDB Connection
 */
export const connectToDatabase = async (): Promise<void> => {
    if (!client) {
        client = new MongoClient(mongoConfig.uri);
        await client.connect();
        database = client.db(mongoConfig.dbName);
        console.log('Connected to MongoDB');
    }
};

/**
 * Get a Collection
 */
export const getCollection = (collectionName: string): Collection<Document> => {
    if (!database) {
        throw new Error('Database connection is not established. Call `connectToDatabase` first.');
    }
    return database.collection(collectionName);
};

/**
 * Get Data from a Collection
 */
export const getData = async (): Promise<Document[]> => {
    const collection = getCollection('dbexample'); // Replace with your collection name
    return collection.find({}).toArray();
};

/**
 * Close the MongoDB Connection
 */
export const closeConnection = async (): Promise<void> => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
};
