// lib/mongodb.js (or a similar utility file)
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI; // Get URI from environment variables
const dbName = process.env.MONGODB_DB_NAME

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}


let cachedClient: typeof MongoClient | null = null;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  let client: typeof MongoClient; // Use typeof MongoClient

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect(); // You'll likely need to cast here
    const db = client.db(dbName);

    if (!cachedClient) {
      cachedClient = client;
    }
    cachedDb = db;

    console.log("Successfully connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectToDatabase;
