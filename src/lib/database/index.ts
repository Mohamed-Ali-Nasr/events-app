import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};

// we have to cash our connection with database, because when we use server actions.. each server action of these actions will have to call connect database again and again and again, and if we weren't cashing again it, it would just be making new connections to the database, but by cashing our connection the promise of connection all the subsequent invocations can reuse the existing connection if its still open or just try to create a new one
