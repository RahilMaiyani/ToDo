import mongoose from "mongoose";

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI || "";

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
