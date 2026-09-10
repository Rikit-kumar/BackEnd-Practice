const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://rishu143531_db_user:rishuRikit2004@ac-5ak0hym-shard-00-00.qyfizbm.mongodb.net:27017,ac-5ak0hym-shard-00-01.qyfizbm.mongodb.net:27017,ac-5ak0hym-shard-00-02.qyfizbm.mongodb.net:27017/?ssl=true&replicaSet=atlas-wuyoij-shard-0&authSource=admin&appName=Rikit-Cluster",
    );
    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.log("Error in Connecting DataBase", error);
  }
};

module.exports = connectDB;
