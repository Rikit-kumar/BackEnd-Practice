const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.log("Error in Connecting DataBase", error);
  }
};

module.exports = connectDB;
