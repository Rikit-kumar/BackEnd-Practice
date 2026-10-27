import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
};
