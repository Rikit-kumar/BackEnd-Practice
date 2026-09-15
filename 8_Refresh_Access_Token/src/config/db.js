import mongoose from "mongoose";
import { config } from "../config/config.js";

const connectDatabase = async (req, res) => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

export default connectDatabase;
