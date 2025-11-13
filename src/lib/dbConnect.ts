import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Global cache for Next.js (avoids reconnecting on hot reload)
const globalForMongoose = globalThis as typeof globalThis & {
  _mongooseConn?: MongooseCache;
};

if (!globalForMongoose._mongooseConn) {
  globalForMongoose._mongooseConn = { conn: null, promise: null };
}

export default async function dbConnect(): Promise<typeof mongoose> {
  const cached = globalForMongoose._mongooseConn!;

  // If connection already exists → return it
  if (cached.conn) return cached.conn;

  // If no existing connection promise → create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // reset so next attempt can reconnect
    throw err;
  }

  // Add listeners only once
  if (mongoose.connection.listenerCount("connected") === 0) {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });
  }

  if (mongoose.connection.listenerCount("error") === 0) {
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  }

  return cached.conn;
}
