require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Use the MONGODB_URI from environment variables or fallback to local MongoDB
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;

// Function to connect to MongoDB
const connectToMongoDB = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(uri, options);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("MongoDB connection error:", error.message || error);
            throw new Error("Failed to connect to MongoDB. Please check your connection string and network.");
        }
    }
    return client;
};

// Function to get a specific database
const getDatabase = (dbName) => {
    if (!client) {
        throw new Error("Client is not connected. Call connectToMongoDB first.");
    }
    return client.db(dbName);
};

// Function to close the MongoDB connection
const closeConnection = async () => {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed");
        client = null; // Reset client to allow reconnection
    }
};

// Handle process termination to close the connection gracefully
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit(0);
});

module.exports = { connectToMongoDB, getDatabase, closeConnection };