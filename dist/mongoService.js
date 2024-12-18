"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.getData = exports.getCollection = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const mongoConfig_1 = require("./config/mongoConfig");
let client;
let database;
/**
 * Initialize MongoDB Connection
 */
const connectToDatabase = async () => {
    if (!client) {
        client = new mongodb_1.MongoClient(mongoConfig_1.mongoConfig.uri);
        await client.connect();
        database = client.db(mongoConfig_1.mongoConfig.dbName);
        console.log('Connected to MongoDB');
    }
};
exports.connectToDatabase = connectToDatabase;
/**
 * Get a Collection
 */
const getCollection = (collectionName) => {
    if (!database) {
        throw new Error('Database connection is not established. Call `connectToDatabase` first.');
    }
    return database.collection(collectionName);
};
exports.getCollection = getCollection;
/**
 * Get Data from a Collection
 */
const getData = async () => {
    const collection = (0, exports.getCollection)('dbexample'); // Replace with your collection name
    return collection.find({}).toArray();
};
exports.getData = getData;
/**
 * Close the MongoDB Connection
 */
const closeConnection = async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
};
exports.closeConnection = closeConnection;
