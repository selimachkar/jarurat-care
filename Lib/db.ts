// lib/mongodb.js (or a similar utility file)
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI; // Get URI from environment variables
const dbName = process.env.MONGODB_DB_NAME

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client;
let db;

async function connectToDatabase() {
  if (client && db) { // Check if connection already exists
    return db; // Return existing database instance
  }

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect(); // Connect only if no existing connection
    db = client.db(dbName); // Select your database

    console.log("Successfully connected to MongoDB!");
    return db;

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for handling in API routes
  }
}

export default connectToDatabase; // This is the key change: export the function
