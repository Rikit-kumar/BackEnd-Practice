import mongoose from "mongoose";

const connectDataBase = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connect Successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

export default connectDataBase;
