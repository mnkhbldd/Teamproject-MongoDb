import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (globalThis as unknown as { mongoose: MongooseConn })
  .mongoose;

if (!cached) {
  cached = (globalThis as unknown as { mongoose: MongooseConn }).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "team-project",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  cached.conn = await cached.promise;

  return cached.conn;
};
